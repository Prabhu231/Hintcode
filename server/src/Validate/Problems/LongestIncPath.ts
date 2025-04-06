import connectDB from "../../Database/db";
import LongestIncreasingPathTestCase from "../../Database/Schemas/LongestIncPathSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForLongestIncreasingPath = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await LongestIncreasingPathTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    const testCaseString = testCases.map(tc => 
        `{ ${tc.input.matrix.map(row => `{ ${row.join(", ")} }`).join(", ")} }`
    ).join(",\n");
    
    // console.log("Matrix test case string:", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<vector<vector<int>>> testCases = { {${testCaseString}} };

          for (auto matrix : testCases) {
              int result = longestIncreasingPath(matrix);
              cout << result << endl;
          }
          return 0;
      }`;

    // console.log("cppCode:", cppCode);

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
        // console.log(`✅ Test ${i + 1} Passed! Input: ${JSON.stringify(testCase.input.matrix)} → Output: ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Input: ${JSON.stringify(testCase.input.matrix)} → Expected: ${expected}, but got: ${output}`);
        return { success: false, failedTestCase: ` matrix = ${JSON.stringify(testCase.input.matrix)}` };
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

export default runTestsForLongestIncreasingPath;