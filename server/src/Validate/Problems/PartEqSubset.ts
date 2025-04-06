import connectDB from "../../Database/db";
import PartitionEqualSubsetSumTestCase from "../../Database/Schemas/PartEqSubsetSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForPartitionEqualSubsetSum = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await PartitionEqualSubsetSumTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => {
        const input = `{${tc.input.nums.join(", ")}}`;
        const expectedOutput = tc.expected_output ? "true" : "false";
        return `{${input}, ${expectedOutput}}`;
      })
      .join(",\n");

    // console.log("Formatted Test Cases:", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
  #include <bits/stdc++.h>
  using namespace std;

  ${cppFunction} // Inject user-defined function

  int main() {
      vector<pair<vector<int>, bool>> testCases = {${testCaseString}};

      for (auto &testcase : testCases) {
          vector<int> nums = testcase.first;
          bool expected = testcase.second;
          bool result = canPartition(nums);

          cout << (result == expected ? "true" : "false") << endl;
      }
      return 0;
  }
  `;

    // console.log("C++ Code:", cppCode);

    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n").map(s => s.replace(/(\r\n|\n|\r)/gm, ""));


    const failedTestCases = [];
    for (let i = 0; i < outputs.length; i++) {
      if (outputs[i] === "false") {
        failedTestCases.push({
          testCase: testCases[i],
          output: outputs[i],
        });
      }
    }

    if (failedTestCases.length === 0) {
      // console.log("✅ All tests passed!");
      return { success: true };
    } else {
      // console.error("❌ Some tests failed!");
      return {
        success: false,
        failedTestCase: `[${failedTestCases[0].testCase.input.nums}]`,
      };
    }
  } catch (error) {
    // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForPartitionEqualSubsetSum;
