import connectDB from "../../Database/db";
import NumberOfIslandsTestCase from "../../Database/Schemas/NumIslandsSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForNumberOfIslands = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await NumberOfIslandsTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => {
        const gridString = tc.input.grid
          .map(row => `{${row.map(cell => `'${cell}'`).join(", ")}}`)
          .join(",\n");
        return `{ ${gridString} }`;
      })
      .join(",\n");

    // console.log("Formatted test cases: ", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<vector<string>> testCases = { ${testCaseString} };

          for (const auto& grid : testCases) {
              vector<vector<char>> charGrid;
              for (const auto& row : grid) {
                  vector<char> charRow(row.begin(), row.end());
                  charGrid.push_back(charRow);
              }
              
              int result = numIslands(charGrid);
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
      const expected = String(testCase.expected_output);

      if (output === expected) {
        // console.log(
        //  `✅ Test ${i + 1} Passed! Input: grid=${JSON.stringify(testCase.input.grid)} → Output: ${output}`
        // );
      } else {
        // console.error(
        //  `❌ Test ${i + 1} Failed! Input: grid=${JSON.stringify(testCase.input.grid)} → Expected: ${expected}, but got: ${output}`
        // );
        return { success: false, failedTestCase: `grid=${JSON.stringify(testCase.input.grid)}` };
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

export default runTestsForNumberOfIslands;
