import connectDB from "../../Database/db";
import BestTimeStock1Testcase from "../../Database/Schemas/BestTimeStock_1Schema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForBestTimeStock1 = async (cppFunction: string) => {
  try {
    await connectDB();

    const testCases = await BestTimeStock1Testcase.find();
    // // console.log(`Retrieved ${testCases.length} test cases`);

 
    const testCaseString = testCases
      .map(tc => `{${tc.input.prices.join(", ")}}`)
      .join(",\n");
    // // console.log("string: ", testCaseString);

    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<vector<int>> testCases = { ${testCaseString} };

          for (const auto &testcase : testCases) {
              int result = maxProfit(testcase);
              cout << result << endl;
          }
          return 0;
      }`;

    // // console.log("cppCode: ", cppCode);

    // Execute the C++ code only once
    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // // console.error("❌ Compilation Error:", executionError);
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
        // // console.log(`✅ Test ${i + 1} Passed! Input: [${testCase.input.prices}] → Output: ${output}`);
      } else {
        // // console.error(`❌ Test ${i + 1} Failed! Input: [${testCase.input.prices}] → Expected: ${expected}, but got: ${output}`);
        return { success: false, failedTestCase: `prices = [${testCase.input.prices}]` };
      }
    }

    return { success: true };
  } catch (error) {
    // // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForBestTimeStock1;
