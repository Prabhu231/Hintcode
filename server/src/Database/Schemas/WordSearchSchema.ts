import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IWordSearchTestCase extends IBaseTestCase {
    input: {
        board: string[][];
        word: string;
    };
    expected_output: boolean;
}

const WordSearchSchema = new Schema({
    problemName: { type: String, required: true },
    description: {
        type: String,
        default: `
Given an m x n grid of characters board and a string word, return true if the word exists in the grid.
The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.
The same letter cell may not be used more than once.`
    },
    input: {
        board: { type: [[String]], required: true }, 
        word: { type: String, required: true }, 
    },
    expected_output: { type: Boolean, required: true }, 
    code: {
        type: String,
        default: `
bool exist(vector<vector<char>>& board, string word) {
  // Complete the function 
}
    `
    },
    bestCaseComplexity: {
        type: String,
        default: "O(m * n * 4^L)", 
    },
    sampleTestcases: {
        type: String,
        default: `
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true

Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
        `
    }
});

const WordSearchTestCase = model<IWordSearchTestCase>(
    "WordSearchTestCase",
    WordSearchSchema
);

export default WordSearchTestCase;
