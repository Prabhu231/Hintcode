import connectDB from "../../Database/db";
import TwoSumTestCase from "../../Database/Schemas/TwoSumSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForTwoSum = async (cppFunction: string) => {
  try {
    await connectDB();

    const testCases = await TwoSumTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);


    const testCaseString = testCases
      .map(tc => `{{${tc.input.nums.join(",")}}, ${tc.input.target}}`)
      .join(",\n");

    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction} // Injected user function

      int main() {
          vector<pair<vector<int>, int>> testCases = {
              ${testCaseString}
          };

          for (auto& testcase : testCases) {
              vector<int> result = twoSum(testcase.first, testcase.second);
              if (result.empty()) {
                  cout << "-1 -1" << endl;
              } else {
                  cout << result[0] << " " << result[1] << endl;
              }
          }
          return 0;
      }
    `;

    // console.log("Generated C++ code:\n", cppCode);

    // Execute the code
    try {
      await executeCpp(cppCode);
    } catch (err) {
      // console.error("❌ Compilation Error:", err);
      return { success: false, syntaxError: err };
    }

    // Read output
    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf-8")).trim().split("\n");

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const { nums, target } = testCase.input;
      const expected = testCase.expected_output;

      const output = outputs[i].trim();
      const actual = output === "-1 -1" ? [] : output.split(" ").map(Number);

      const valid =
        expected.length === 0
          ? actual.length === 0 || actual[0] === -1
          : actual.length === 2 &&
            actual[0] >= 0 && actual[1] >= 0 &&
            actual[0] < nums.length && actual[1] < nums.length &&
            nums[actual[0]] + nums[actual[1]] === target;

      if (valid) {
        // console.log(`✅ Test ${i + 1} Passed`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed`);
        // console.error(`  Input: nums = [${nums}], target = ${target}`);
        // console.error(`  Expected: ${expected}`);
        // console.error(`  Got: ${actual}`);
        return { success: false, failedTestCase: `nums = [${testCase.input.nums.join(', ')}] target = ${testCase.input.target}` };
      }
    }

    return { success: true };
  } catch (error) {
    // console.error("Unexpected Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForTwoSum;
