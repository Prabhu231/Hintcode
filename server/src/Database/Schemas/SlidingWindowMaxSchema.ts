import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ISlidingWindowMaxTestCase extends IBaseTestCase {
  input: {
    nums: number[];
    k: number;
  };
  expected_output: number[];
}

const SlidingWindowMaxSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given an array nums and a window size k, return the maximum element for each sliding window of size k.",
  },
  input: {
    nums: { type: [Number], required: true },
    k: { type: Number, required: true },
  },
  expected_output: { type: [Number], required: true },
  code: {
    type: String,
    default: 
    `
vector<int> maxSlidingWindow(vector<int>& nums, int k) {
  // Complete the function 
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(n)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

Input: nums = [1], k = 1
Output: [1]

Input: nums = [1,-1], k = 1
Output: [1,-1]

Input: nums = [9,11], k = 2
Output: [11]

Input: nums = [4,-2], k = 2
Output: [4]
    `,
  },
});

const SlidingWindowMaxTestCase = model<ISlidingWindowMaxTestCase>(
  "SlidingWindowMaxTestCase",
  SlidingWindowMaxSchema
);

export default SlidingWindowMaxTestCase;
