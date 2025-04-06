import connectDB from "../../Database/db";
import LongestPalindromicSubstringTestCase from "../../Database/Schemas/LongestPalindromicSubstringSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForLongestPalindrome = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await LongestPalindromicSubstringTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases.map(tc => `"${tc.input.s}"`).join(",\n");
    const expectedOutputString = testCases.map(tc => `"${tc.expected_output}"`).join(",\n");

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<string> testCases = { ${testCaseString} };
          vector<string> expectedOutputs = { ${expectedOutputString} };

          for (int i = 0; i < testCases.size(); i++) {
              string input = testCases[i];
              string expectedOutput = expectedOutputs[i];
              string result = longestPalindrome(input);

              // Check if the result length matches the expected output length and is a valid substring
              if (result.length() == expectedOutput.length() && input.find(result) != string::npos) {
                  cout << "true" << endl;
              } else {
                  cout << "false" << endl;
              }
          }
          return 0;
      }
    `;

    // console.log('C++ Code:', cppCode);

    // Execute the C++ code
    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    // Read the output file
    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n").map((s) => s.replace(/(\r\n|\n|\r)/gm, ""));

    // Validate results
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i].trim();

      // Evaluate the output based on the correctness of the result
      if (output === "true") {
        // console.log(`✅ Test ${i + 1} Passed! Input: "${testCase.input.s}" → Correct Palindrome Substring`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Input: "${testCase.input.s}" → Expected: "${testCase.expected_output}", but got a false result`);
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

export default runTestsForLongestPalindrome;
