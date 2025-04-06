import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ILongestIncreasingPathTestCase extends IBaseTestCase {
    input: {
        matrix: number[][];
    };
    expected_output: number;
}

const LongestIncreasingPathSchema = new Schema({
    problemName: { type: String, required: true },
    description: {
        type: String,
        default: `
Given an m x n integers matrix, return the length of the longest increasing path in matrix.
From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).`
    },
    input: {
        matrix: { type: [[Number]], required: true },
    },
    expected_output: { type: Number, required: true },
    code: { 
        type: String, 
        default: `
int longestIncreasingPath(vector<vector<int>>& matrix) {
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
Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4

Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
        `
    }
});

const LongestIncreasingPathTestCase = model<ILongestIncreasingPathTestCase>(
    "LongestIncreasingPathTestCase",
    LongestIncreasingPathSchema
);

export default LongestIncreasingPathTestCase;
