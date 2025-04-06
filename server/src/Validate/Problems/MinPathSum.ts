import connectDB from "../../Database/db";
import MinPathSumTestCase from "../../Database/Schemas/MinPathSumSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForMinPathSum = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await MinPathSumTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test cases properly for C++
    const testCaseString = testCases.map(tc => {
      const gridStr = "{" + tc.input.grid.map(row => "{" + row.join(",") + "}").join(",") + "}";
      return gridStr;
    }).join(",\n");

    // console.log('Formatted Test Cases: ', testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<vector<vector<int>>> testCases = { ${testCaseString} };

          for (const auto &testcase : testCases) {
              int result = minPathSum(testcase);
              cout << result << endl;
          }
          return 0;
      }`;

    // console.log('Generated C++ Code:', cppCode);

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
      const output = outputs[i].trim();
      const expected = testCase.expected_output;

      if (parseInt(output) === expected) {
        // console.log(`✅ Test ${i + 1} Passed! Input: ${JSON.stringify(testCase.input.grid)} → Output: ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Input: ${JSON.stringify(testCase.input.grid)} → Expected: ${expected}, but got: ${output}`);
        return { success: false, failedTestCase: `[${testCase.input.grid.map(row => `[${row.join(', ')}]`)}]` };

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

export default runTestsForMinPathSum;