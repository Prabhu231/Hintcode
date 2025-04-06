import connectDB from "../../Database/db";
import WordSearchTestCase from "../../Database/Schemas/WordSearchSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForWordSearch = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await WordSearchTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
  .map(tc => `{ {${tc.input.board.map(row => `{ ${row.map(char => `'${char}'`).join(", ")} }`).join(", ")} }, "${tc.input.word}" }`)
  .join(",\n");

    // console.log("Formatted test cases: ", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function


      int main() {
          vector<pair<vector<vector<char>>, string>> testCases = { ${testCaseString} };

          for (auto testcase : testCases) {
              vector<vector<char>> board = testcase.first;
              string word = testcase.second;
              
              bool result = exist(board, word);
              cout << (result ? "true" : "false") << endl;
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
      const output = outputs[i].trim().toLowerCase();
      const expected = testCase.expected_output;

      if ((output == 'true' && expected) || (output == 'false' && !expected)) {
        // console.log(
        //  `✅ Test ${i + 1} Passed! Input: board=[${testCase.input.board.map(row => `[${row.join(", ")}]`).join(", ")}], word="${testCase.input.word}" → Output: ${output}`
        // );
      } else {
        // console.error(
        //  `❌ Test ${i + 1} Failed! Input: board=[${testCase.input.board.map(row => `[${row.join(", ")}]`).join(", ")}], word="${testCase.input.word}" → Expected: ${expected}, but got: ${output}`
        // );
        return { success: false, failedTestCase: `board=[${testCase.input.board.map(row => `[${row.join(", ")}]`).join(", ")}], word="${testCase.input.word}"` };
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

export default runTestsForWordSearch;
