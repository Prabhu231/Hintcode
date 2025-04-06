import connectDB from "../../Database/db";
import LastStoneWeightTestCase from "../../Database/Schemas/LastStoneWeightSchema"; // Assuming you have a schema for LastStoneWeight test cases
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForLastStoneWeight = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await LastStoneWeightTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => `{{${tc.input.stones.join(", ")}}}`)
      .join(",\n");

    // console.log('string: ', testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<vector<int>> testCases = {
              ${testCaseString}
          };

          for (auto &testcase : testCases) {
              int result = lastStoneWeight(testcase);
              cout << result << endl;  // Output the remaining stone's weight or 0 if none
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

    // Validate results using expected output from MongoDB
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i].trim();
      const expectedOutput = testCase.expected_output; 

      const result = Number(output);

      if (result === expectedOutput) {
        // console.log(`✅ Test ${i + 1} Passed! Expected = ${expectedOutput}, Got = ${result}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Expected = ${expectedOutput}, Got = ${result}`);
        return { success: false, failedTestCase: `stones = [${testCase.input.stones}]` };
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

export default runTestsForLastStoneWeight;
