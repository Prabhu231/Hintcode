import connectDB from "../../Database/db";
import JumpGameTestCase from "../../Database/Schemas/JumpGameSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForJumpGame = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await JumpGameTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => `{ ${tc.input.nums.join(',')} }`)  // Format nums array as string
      .join(",\n");
    // console.log("Formatted test cases: ", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<vector<int>> testCases = { ${testCaseString} };

          for (auto nums : testCases) {
              bool result = canJump(nums);
              cout << (result ? "true" : "false") << endl;
          }
          return 0;
      }`;

    // console.log("Generated C++ Code: ", cppCode);

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
      const expected = testCase.expected_output ? "true" : "false";

      if (output === expected) {
        // console.log(
          `✅ Test ${i + 1} Passed! Input: nums="${testCase.input.nums}" → Output: ${output}`
        );
      } else {
        // console.error(
          `❌ Test ${i + 1} Failed! Input: nums="${testCase.input.nums}" → Expected: ${expected}, but got: ${output}`
        );
        return { success: false, failedTestCase: `nums = [${testCase.input.nums.join(',')}]` };
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

export default runTestsForJumpGame;
