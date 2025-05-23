import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ISudokuSolverTestCase extends IBaseTestCase {
  input: {
    board: string[][];
  };
  expected_output: string[][];
}

const SudokuSolverSchema = new Schema({
  problemName: { type: String, required: true, default: "Sudoku Solver" },
  description: {
    type: String,
    default: `Write a program to solve a Sudoku puzzle by filling the empty cells.

A valid Sudoku solution must satisfy all of the following rules:
- Each of the digits 1-9 must occur exactly once in each row.
- Each of the digits 1-9 must occur exactly once in each column.
- Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells that need to be filled.`,
  },
  input: {
    board: { type: [[String]], required: true }, // 2D array of strings
  },
  expected_output: { type: [[String]], required: true }, // 2D array of strings representing the solved Sudoku board
  code: {
    type: String,
    default: `
void solveSudoku(vector<vector<char>>& board) {
  // Complete the function
}
  `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(1) (for a pre-filled valid board) / O(9^N) (Backtracking)",
  },
  sampleTestcases: {
    type: String,
    default: `
Input:
board = [["5","3",".",".","7",".",".",".","."],
         ["6",".",".","1","9","5",".",".","."],
         [".","9","8",".",".",".",".","6","."],
         ["8",".",".",".","6",".",".",".","3"],
         ["4",".",".","8",".","3",".",".","1"],
         ["7",".",".",".","2",".",".",".","6"],
         [".","6",".",".",".",".","2","8","."],
         [".",".",".","4","1","9",".",".","5"],
         [".",".",".",".","8",".",".","7","9"]]
Output:
[["5","3","4","6","7","8","9","1","2"],
 ["6","7","2","1","9","5","3","4","8"],
 ["1","9","8","3","4","2","5","6","7"],
 ["8","5","9","7","6","1","4","2","3"],
 ["4","2","6","8","5","3","7","9","1"],
 ["7","1","3","9","2","4","8","5","6"],
 ["9","6","1","5","3","7","2","8","4"],
 ["2","8","7","4","1","9","6","3","5"],
 ["3","4","5","2","8","6","1","7","9"]]
  `,
  },
});

const SudokuSolverTestCase = model<ISudokuSolverTestCase>(
  "SudokuSolverTestCase",
  SudokuSolverSchema
);

export default SudokuSolverTestCase;
