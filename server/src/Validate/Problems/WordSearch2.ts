import connectDB from "../../Database/db";
import WordSearch2TestCase from "../../Database/Schemas/WordSearch2Schema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForWordSearch2 = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await WordSearch2TestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => `{ {${tc.input.board.map(row => `{ ${row.map(char => `'${char}'`).join(", ")} }`).join(", ")} }, {${tc.input.words.map(word => `"${word}"`).join(", ")}} }`)
      .join(",\n");

    // console.log("Formatted test cases: ", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
    #include <bits/stdc++.h>
    using namespace std;

    ${cppFunction}  // Inject user function

    int main() {
        vector<pair<vector<vector<char>>, vector<string>>> testCases = { ${testCaseString} };

        for (auto testcase : testCases) {
            vector<vector<char>> board = testcase.first;
            vector<string> words = testcase.second;

            vector<string> result = findWords(board, words);

            // Print results
            for (const string& word : result) {
                cout << word << endl;
            }
            cout << "end" << endl;
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

    // Read and parse the output file
    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const rawOutput = await fs.readFile(outputPath, "utf8");

    const outputs = rawOutput
      .split("end")
      .map(block =>
        block
          .split("\n")
          .map(s => s.trim())
          .filter(s => s.length > 0)
          .sort()
      );

    // console.log("outputs: ", outputs);

    // Validate results
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i];
      const expected = [...testCase.expected_output].sort();

      // console.log("output: ", output.join(","));
      // console.log("expected: ", expected.join(","));

      if (output.join(",") === expected.join(",")) {
        // console.log(
        //  `✅ Test ${i + 1} Passed! Input: board=[${testCase.input.board.map(row => `[${row.join(", ")}]`).join(", ")}], words=[${testCase.input.words.join(", ")}] → Output: [${output.join(", ")}]`
        // );
      } else {
        // // console.error(
        //  `❌ Test ${i + 1} Failed! Input: board=[${testCase.input.board.map(row => `[${row.join(", ")}]`).join(", ")}], words=[${testCase.input.words.join(", ")}] → Expected: [${expected.join(", ")}], but got: [${output.join(", ")}]`
        // );
        return {
          success: false,
          failedTestCase: `board=[${testCase.input.board.map(row => `[${row.join(", ")}]`).join(", ")}], words=[${testCase.input.words.join(", ")}]`
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

export default runTestsForWordSearch2;
