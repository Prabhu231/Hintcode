import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IMaximumSubarrayTestCase extends IBaseTestCase {
  input: {
    nums: number[];  
  };
  expected_output: number; 
}

const MaximumSubarraySchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
  },
  input: {
    nums: { type: [Number], required: true },  // Input array of integers
  },
  expected_output: { type: Number, required: true },  // Expected maximum subarray sum
  code: {
    type: String,
    default:
    `
int maxSubArray(vector<int>& nums) {
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
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6

Input: nums = [1]
Output: 1

Input: nums = [5,4,-1,7,8]
Output: 23
    `,
  },
});

const MaximumSubarrayTestCase = model<IMaximumSubarrayTestCase>(
  "MaximumSubarrayTestCase",
  MaximumSubarraySchema
);

export default MaximumSubarrayTestCase;
