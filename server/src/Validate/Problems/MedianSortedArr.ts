import connectDB from "../../Database/db";
import MedianOfTwoSortedArraysTestCase from "../../Database/Schemas/MedianSortedArrSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForMedianOfTwoSortedArrays = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await MedianOfTwoSortedArraysTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = `{
        ${testCases.map(tc => `{ {${tc.input.nums1.join(", ")}}, {${tc.input.nums2.join(", ")}} }`).join(",\n    ")}
    }`;
    

    // console.log('string: ', testCaseString)

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function


      int main() {
          vector<pair<vector<int>, vector<int>>> testCases = ${testCaseString};

          for (int i=0;i<testCases.size();i++) {
              double result = findMedianSortedArrays(testCases[i].first, testCases[i].second);
              cout << result << endl;
          }
          return 0;
      }`;

    // console.log('cppCode: ', cppCode);

    // Execute the C++ code only once
    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    // Read the output file
    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n");

    // Validate results
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i].trim();
      const expectedOutput = testCase.expected_output;

      // Validate median result
      if (parseFloat(output) === expectedOutput) {
        // console.log(`✅ Test ${i + 1} Passed! Median: ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Expected: ${expectedOutput}, but got ${output}`);
        return { success: false, failedTestCase: `nums1 = [${testCase.input.nums1}], nums2 = [${testCase.input.nums2}]` };
      }
    }

    return { success: true };
  } catch (error) {
    // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForMedianOfTwoSortedArrays;
