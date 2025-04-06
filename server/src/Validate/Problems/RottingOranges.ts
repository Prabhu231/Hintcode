import connectDB from "../../Database/db";
import RottingOrangesTestCase from "../../Database/Schemas/RottingOrangesSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForRottingOranges = async (cppFunction: string) => {
  try {
    await connectDB();

    // console.log('temp: ', TEMP_DIR)

    // Fetch test cases from MongoDB
    const testCases = await RottingOrangesTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format each grid to valid C++ syntax
    const testCaseString = testCases
      .map(tc => {
        const gridStr = tc.input.grid
          .map(row => `{ ${row.join(", ")} }`)
          .join(", ");
        return `{ ${gridStr} }`;
      })
      .join(",\n");

    // Generate C++ code with formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Injected user solution

      int main() {
          vector<vector<vector<int>>> testCases = { ${testCaseString} };

          for (auto grid : testCases) {
              int result = orangesRotting(grid);
              cout << result << endl;
          }

          return 0;
      }
    `;

    // Execute the C++ code
    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    // Read the result output
    const outputPath = path.join(TEMP_DIR, "temp.txt");

    // console.log('output path: ', outputPath)
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n");
    if (!fs.existsSync(outputPath)) {
      // console.error("❌ Output file not created");
    } else {
      const outputs = await fs.readFile(outputPath, "utf8");
      // console.log("Raw output content:", outputs);
    }

    // console.log('outputs: ', outputs)

    // Compare actual vs expected
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i].trim();
      const expected = testCase.expected_output.toString();

      if (output === expected) {
        // console.log(`✅ Test ${i + 1} Passed! Output: ${output}`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Expected: ${expected}, Got: ${output}`);
        return { success: false, failedTestCase: `[${testCase.input.grid.map(row => `[${row.join(',')}]`).join(',')}]` };
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

export default runTestsForRottingOranges;
