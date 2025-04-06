import connectDB from "../../Database/db";
import HouseRobber2TestCase from "../../Database/Schemas/HouseRobber2Schema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForHouseRobber2 = async (cppFunction: string) => {
  try {
    await connectDB();

    const testCases = await HouseRobber2TestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    const testCaseString = testCases
      .map(tc => `{${tc.input.nums.join(", ")}}`)
      .join(",\n");

    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}

      int main() {
          vector<vector<int>> testCases = { ${testCaseString} };

          for (auto &testcase : testCases) {
              int result = rob(testcase);
              cout << result << endl;
          }
          return 0;
      }`;

    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n");

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i].trim();
      const expectedOutput = testCase.expected_output;

      if (Number(output) === expectedOutput) {
        // console.log(`✅ Test ${i + 1} Passed! Expected = ${expectedOutput}, Got = ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Expected = ${expectedOutput}, Got = ${output}`);
        return { success: false, failedTestCase: `nums = [${testCase.input.nums}]` };
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

export default runTestsForHouseRobber2;
