import connectDB from "../../Database/db";
import SudokuSolverTestCase from "../../Database/Schemas/SudokuSolverSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForSudokuSolver = async (cppFunction: string) => {
    try {
        await connectDB();

        // Fetch test cases from MongoDB
        const testCases = await SudokuSolverTestCase.find();
        // console.log(`Retrieved ${testCases.length} test cases`);

        // Format test case data properly
        const testCaseString = testCases
            .map(tc => {
                const boardString = tc.input.board
                    .map(row => `{${row.map(cell => `'${cell}'`).join(", ")}}`)
                    .join(",\n");
                return `{ ${boardString} }`;
            })
            .join(",\n");

        // console.log("Formatted Test Cases:", testCaseString);

        // Generate C++ Code
        const cppCode = `
#include <bits/stdc++.h>
using namespace std;

${cppFunction} // Inject user function

bool isValidSudoku_System(vector<vector<char>> &mat) {
    vector<int> rows(9), cols(9), subMat(9);

    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {

            // Skip empty cells
            if (mat[i][j] == '.')
                return false;

            int val = mat[i][j] - '1'; // Convert '1'-'9' to 0-8
            int pos = 1 << val; 

            if ((rows[i] & pos) > 0) return false;
            rows[i] |= pos;

            if ((cols[j] & pos) > 0) return false;
            cols[j] |= pos;

            int idx = (i / 3) * 3 + (j / 3);
            if ((subMat[idx] & pos) > 0) return false;
            subMat[idx] |= pos;
        }
    }
    return true;
}




int main() {
    vector<vector<vector<char>>> testCases = { ${testCaseString} };

    for (auto &board : testCases) {
        solveSudoku(board);

        if (isValidSudoku_System(board)) {
            cout << "True" << endl;
        } else {
            cout << "False" << endl;
        }

        cout << "END" << endl;
    }
    
    return 0;
}
        `;

        // console.log("Generated C++ Code:", cppCode);

        // Execute C++ code
        try {
            await executeCpp(cppCode);
        } catch (executionError) {
            // console.error("❌ Compilation Error:", executionError);
            return { success: false, syntaxError: executionError };
        }

        // Read the output file
        const outputPath = path.join(TEMP_DIR, "temp.txt");
        const rawOutput = await fs.readFile(outputPath, "utf8");

        if (!rawOutput.trim()) {
            // console.error("❌ Error: Output file is empty.");
            return { success: false, error: "Empty output file" };
        }

        // Split output into individual test case results
        const outputData = rawOutput.trim().split("END\n").map(block => block.trim());



        const allOutputs = rawOutput.trim().split(/\s*END\s*/).map(s => s.trim());

for (let i = 0; i < testCases.length; i++) {
    if (allOutputs[i] === "True") {  
        // console.log(`✅ Test ${i + 1} Passed!`);
    } else {
        // console.error(`❌ Test ${i + 1} Failed!`);
        // console.log('Got:', JSON.stringify(allOutputs[i]));  
        return { success: false, failedTestCase: `[${testCases[i].input.board.map(row => `[${row.join(', ')}]`)}]` };
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

export default runTestsForSudokuSolver;
