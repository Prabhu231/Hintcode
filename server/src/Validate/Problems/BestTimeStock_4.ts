import connectDB from "../../Database/db";
import BestTimeStock4TestCase from "../../Database/Schemas/BestTimeStock_4Schema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForBestTimeStock4 = async (cppFunction: string) => {
  try {
    await connectDB();

    const testCases = await BestTimeStock4TestCase.find();
    // // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => `{ ${tc.input.k}, { ${tc.input.prices.join(", ")} } }`)
      .join(",\n");
    // // console.log("Formatted test cases: ", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<pair<int, vector<int>>> testCases = { ${testCaseString} };

          for (auto testcase : testCases) {
              int k = testcase.first;
              vector<int> prices = testcase.second;
              
              int result = maxProfit(k, prices);
              cout << result << endl;
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
      const expected = testCase.expected_output;

      if (parseInt(output) === expected) {
        // console.log(
        //  `✅ Test ${i + 1} Passed! Input: k=${testCase.input.k}, prices=[${testCase.input.prices.join(
        //    ", "
        //  )}] → Output: ${output}`
        // );
      } else {
        // console.error(
        //  `❌ Test ${i + 1} Failed! Input: k=${testCase.input.k}, prices=[${testCase.input.prices.join(
        //    ", "
        //  )}] → Expected: ${expected}, but got: ${output}`
        // );
        return { success: false, failedTestCase: ` k=${testCase.input.k}, prices=[${testCase.input.prices.join(", ")}]` };
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

export default runTestsForBestTimeStock4;
