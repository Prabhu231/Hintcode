import connectDB from "../../Database/db";
import MinWindowSubstringTestCase from "../../Database/Schemas/MinWindowSubstringSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForMinWindowSubstring = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await MinWindowSubstringTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => `{ \"${tc.input.s}\", \"${tc.input.t}\" }`)
      .join(",\n");
    // console.log("string: ", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<pair<string, string>> testCases = { ${testCaseString} };

          for (auto testcase: testCases) {
              string result = minWindow(testcase.first, testcase.second);
              cout << result << endl;
          }
          return 0;
      }`;

    // console.log("cppCode: ", cppCode);

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
      const expected = testCase.expected_output;

      if (output === expected) {
        // console.log(`✅ Test ${i + 1} Passed! Input: s = "${testCase.input.s}", t = "${testCase.input.t}" → Output: "${output}"`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Input: s = "${testCase.input.s}", t = "${testCase.input.t}" → Expected: "${expected}", but got: "${output}"`);
        return { success: false, failedTestCase: `s = ${testCase.input.s}, t = ${testCase.input.t}` };
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

export default runTestsForMinWindowSubstring;
