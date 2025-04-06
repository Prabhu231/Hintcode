import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface INumberOfIslandsTestCase extends IBaseTestCase {
  input: {
    grid: string[][];
  };
  expected_output: number;
}

const NumberOfIslandsSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
  },
  input: {
    grid: { type: [[String]], required: true }, // 2D array of strings
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: 
    `
int numIslands(vector<vector<char>>& grid) {
  // Complete the function 
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(m * n)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input:
grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Input:
grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
    `,
  },
});

const NumberOfIslandsTestCase = model<INumberOfIslandsTestCase>(
  "NumberOfIslandsTestCase",
  NumberOfIslandsSchema
);

export default NumberOfIslandsTestCase;
