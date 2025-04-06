import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IMaxAreaOfIslandTestCase extends IBaseTestCase {
  input: {
    grid: number[][];
  };
  expected_output: number;
}

const MaxAreaOfIslandSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
Given a non-empty 2D array grid of 0's and 1's, an island is a group of 1's 
(representing land) connected 4-directionally (horizontal or vertical). 
You may assume all four edges of the grid are surrounded by water.

Return the maximum area of an island in the given 2D grid. 
If there is no island, return 0.
    `.trim(),
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
    default: `
int maxAreaOfIsland(vector<vector<int>>& grid) {
    // Complete the function
}
    `.trim(),
  },
  bestCaseComplexity: {
    type: String,
    default: "O(m * n)",
  },
  sampleTestcases: {
    type: String,
    default: `
Input: grid = [
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]
Output: 6

Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
    `.trim(),
  },
});

const MaxAreaOfIslandTestCase = model<IMaxAreaOfIslandTestCase>(
  "MaxAreaOfIslandTestCase",
  MaxAreaOfIslandSchema
);

export default MaxAreaOfIslandTestCase;
