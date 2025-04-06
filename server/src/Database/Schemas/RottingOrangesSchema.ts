import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IRottingOrangesTestCase extends IBaseTestCase {
  input: {
    grid: number[][];
  };
  expected_output: number;
}

const RottingOrangesSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      `You are given an m x n grid where each cell can have one of three values:

0 representing an empty cell,
1 representing a fresh orange, or
2 representing a rotten orange.
Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.`
  },
  input: {
    grid: {
      type: [[Number]],
      required: true,
    },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: 
`
int orangesRotting(vector<vector<int>>& grid) {
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
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1

Input: grid = [[0,2]]
Output: 0`,
  },
});

const RottingOrangesTestCase = model<IRottingOrangesTestCase>(
  "RottingOrangesTestCase",
  RottingOrangesSchema
);

export default RottingOrangesTestCase;
