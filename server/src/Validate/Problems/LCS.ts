import connectDB from "../../Database/db";
import LongestCommonSubsequenceTestCase from "../../Database/Schemas/LCSSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForLCS = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch LCS test cases from MongoDB
    const testCases = await LongestCommonSubsequenceTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => `{ "${tc.input.text1}", "${tc.input.text2}" }`)
      .join(",\n");
    // console.log("Formatted test cases:\n", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<pair<string, string>> testCases = { ${testCaseString} };

          for (auto& testcase: testCases) {
              int result = longestCommonSubsequence(testcase.first, testcase.second);
              cout << result << endl;
          }
          return 0;
      }`;

    // console.log("Generated C++ Code:\n", cppCode);

    // Execute the C++ code
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
      const output = parseInt(outputs[i].trim(), 10);
      const expected = testCase.expected_output;

      if (output === expected) {
        // console.log(`✅ Test ${i + 1} Passed! Input: text1 = "${testCase.input.text1}", text2 = "${testCase.input.text2}" → Output: ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Input: text1 = "${testCase.input.text1}", text2 = "${testCase.input.text2}" → Expected: ${expected}, but got: ${output}`);
        return { success: false, failedTestCase: `text1 = "${testCase.input.text1}", text2 = "${testCase.input.text2}"` };
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

export default runTestsForLCS;
