import connectDB from "../../Database/db";
import MaxAreaOfIslandTestCase from "../../Database/Schemas/AreaOfIslandSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForMaxAreaOfIsland = async (cppFunction: string) => {
  try {
    await connectDB();

    const testCases = await MaxAreaOfIslandTestCase.find();
    // // console.log(`Retrieved ${testCases.length} test cases`);

    const formattedGrids = testCases.map(tc => {
      const gridRows = tc.input.grid
        .map(row => `{${row.join(",")}}`)
        .join(",\n      ");
      return `{\n      ${gridRows}\n    }`;
    });

    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // User's function

      int main() {
          vector<vector<vector<int>>> testCases = {
              ${formattedGrids.join(",\n")}
          };

          for (auto grid : testCases) {
              cout << maxAreaOfIsland(grid) << endl;
          }
          return 0;
      }
    `;

   // // console.log("Generated C++ Code: ", cppCode);

    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n");

    // // console.log("output: ", outputs)

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i].trim();
      const expected = String(testCase.expected_output);

      if (output === expected) {
        // // console.log(`✅ Test ${i + 1} Passed!`);
      } else {
        // // console.error(
        //  `❌ Test ${i + 1} Failed!\nInput Grid: ${JSON.stringify(
        //    testCase.input.grid
        //  )}\nExpected: ${expected}\nGot: ${output}`
        // );
        return { success: false, failedTestCase: `\ngrid = [${testCase.input.grid.map(row => `[${row.join(', ')}]`)}]` };
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

export default runTestsForMaxAreaOfIsland;
