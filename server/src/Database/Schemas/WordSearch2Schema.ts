import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IWordSearch2TestCase extends IBaseTestCase {
    input: {
        board: string[][];  
        words: string[];    
    };
    expected_output: string[];  
}

const WordSearch2Schema = new Schema({
    problemName: { type: String, required: true },
    description: {
        type: String,
        default: `Given a 2D board and a list of words, find all words in the board. 
        A word can be constructed from letters of sequentially adjacent cells, 
        where adjacent cells are horizontally or vertically neighboring. The same letter cell 
        may not be used more than once for the same word.\n Note: The inputs will contain only uppercase letters.
        `
    },
    input: {
        board: { type: [[String]], required: true },  // 2D array representing the board
        words: { type: [String], required: true },   // List of words to search
    },
    expected_output: { type: [String], required: true }, // Array of words found in the board
    code: {
        type: String,
        default: `
vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
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
Input: board = [["O","A","A","N"],["E","T","A","E"],["I","H","K","R"],["I","F","L","V"]], words = ["OATH","PEA","EAT","RAIN"]
Output: ["EAT","OATH"]

Input: board = [["A","B"],["C","D"]], words = ["ABCB"]
Output: []

Input: board = [["A","A"]], words = ["A"]
Output: ["A"]

        `
    }
});

const WordSearch2TestCase = model<IWordSearch2TestCase>(
    "WordSearch2TestCase",
    WordSearch2Schema
);

export default WordSearch2TestCase;
