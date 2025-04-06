import connectDB from "../../Database/db";
import PalindromicSubstringsTestCase from "../../Database/Schemas/PalSubstringsSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForPalindromicSubstrings = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await PalindromicSubstringsTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases.map(tc => `"${tc.input.s}"`).join(",\n");
    // console.log("Test case input string:", testCaseString);

    // Generate C++ code with formatted test cases
    const cppCode = 
      `#include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<string> testCases = { ${testCaseString} };

          for (const string &testcase : testCases) {
              int result = countSubstrings(testcase);
              cout << result << endl;
          }
          return 0;
      };`;

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
      const output = parseInt(outputs[i].trim());
      const expected = testCase.expected_output;

      if (output === expected) {
        // console.log(`✅ Test ${i + 1} Passed! Input: "${testCase.input.s}" → Output: ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Input: "${testCase.input.s}" → Expected: ${expected}, but got: ${output}`);
        return { success: false, failedTestCase: `s = ${testCase.input.s}` };
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

export default runTestsForPalindromicSubstrings;
