import connectDB from "../../Database/db";
import DungeonGameTestCase from "../../Database/Schemas/DungeonGameSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForDungeonGame = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await DungeonGameTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Convert test case input (2D grid) into a valid C++ representation
    const testCaseString = testCases.map(tc => {
      return `{${tc.input.dungeon.map(row => `{${row.join(",")}}`).join(",")}}`;
    }).join(",\n");

    // console.log("Formatted Test Cases: ", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<vector<vector<int>>> testCases = { ${testCaseString} };

          for (const auto &dungeon : testCases) {
              int result = calculateMinimumHP(dungeon);
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
        // console.log(`✅ Test ${i + 1} Passed! Dungeon: ${JSON.stringify(testCase.input.dungeon)} → Output: ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Dungeon: ${JSON.stringify(testCase.input.dungeon)} → Expected: ${expected}, but got: ${output}`);
        const formatGrid = (grid: number[][]) => {
            return grid.map(row => row.join(", ")).join("\n");
          };
        return { 
          success: false, 
          failedTestCase: `\n${formatGrid(testCase.input.dungeon)}`  
        };
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

export default runTestsForDungeonGame;
