import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ILongestIncreasingSubsequenceTestCase extends IBaseTestCase {
  input: {
    nums: number[];
  };
  expected_output: number;
}

const LongestIncreasingSubsequenceSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
  },
  input: {
    nums: { type: [Number], required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: 
    `
int lengthOfLIS(vector<int>& nums) {
  // Complete the function
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(n log n)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4

Input: nums = [0,1,0,3,2,3]
Output: 4

Input: nums = [7,7,7,7,7,7,7]
Output: 1
    `,
  },
});

const LongestIncreasingSubsequenceTestCase = model<ILongestIncreasingSubsequenceTestCase>(
  "LongestIncreasingSubsequenceTestCase",
  LongestIncreasingSubsequenceSchema
);

export default LongestIncreasingSubsequenceTestCase;
