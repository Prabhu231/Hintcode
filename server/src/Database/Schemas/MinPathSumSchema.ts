import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IMinPathSumTestCase extends IBaseTestCase {
    input: {
        grid: number[][];
    };
    expected_output: number;
}

const MinPathSumSchema = new Schema({
    problemName: { type: String, required: true },
    description: {
        type: String,
        default: 'Given a grid of size m x n filled with non-negative numbers, find a path from the top-left to the bottom-right which minimizes the sum of all numbers along its path.'
    },
    input: {
        grid: { type: [[Number]], required: true },
    },
    expected_output: { type: Number, required: true },
    code: {
        type: String,
        default: `
int minPathSum(vector<vector<int>> grid) {
  // Complete the function 
}
    `
    },
    bestCaseComplexity: {
        type: String,
        default: "O(m * n)"
    },
    sampleTestcases: {
        type: String,
        default: `
Input: grid = [[1,3,1],[1,5,1],[4,2,1]]
Output: 7

Input: grid = [[1,2,3],[4,5,6]]
Output: 12
        `
    }
});

const MinPathSumTestCase = model<IMinPathSumTestCase>(
    "MinPathSumTestCase",
    MinPathSumSchema
);

export default MinPathSumTestCase;
