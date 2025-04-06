import connectDB from "../../Database/db";
import CoinChange2TestCase from "../../Database/Schemas/CoinChange2Schema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForCoinChange2 = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch Coin Change 2 test cases from MongoDB
    const testCases = await CoinChange2TestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => `{ ${tc.input.coins.join(',')}, ${tc.input.amount} }`)
      .join(",\n");
    // console.log("Formatted test cases:\n", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<vector<int>> testCases =  {${testCaseString}} ;

          for (auto& testcase: testCases) {
              vector<int> coins;
              for(int i=0;i<testcase.size()-1;i++) {
              coins.push_back(testcase[i]);
              }
              int result = coinChange2(coins, testcase[testcase.size()-1]);
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
        // console.log(`✅ Test ${i + 1} Passed! Input: coins = ${JSON.stringify(testCase.input.coins)}, amount = ${testCase.input.amount} → Output: ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Input: coins = ${JSON.stringify(testCase.input.coins)}, amount = ${testCase.input.amount} → Expected: ${expected}, but got: ${output}`);
        return { success: false, failedTestCase: `coins = ${JSON.stringify(testCase.input.coins)}, amount = ${testCase.input.amount}` };
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

export default runTestsForCoinChange2;
