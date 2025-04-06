import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IMaximumProductSubarrayTestCase extends IBaseTestCase {
  input: {
    nums: number[];
  };
  expected_output: number;
}

const MaximumProductSubarraySchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `Given an integer array nums, find a contiguous subarray that produces the maximum product and return that product.`,
  },
  input: {
    nums: { type: [Number], required: true }, // Array of integers
  },
  expected_output: { type: Number, required: true }, // Maximum product result
  code: {
    type: String,
    default: 
    `
int maxProduct(vector<int>& nums) {
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
Input: nums = [2,3,-2,4]
Output: 6

Input: nums = [-2,0,-1]
Output: 0

Input: nums = [0,2]
Output: 2
    `,
  },
});

const MaximumProductSubarrayTestCase = model<IMaximumProductSubarrayTestCase>(
  "MaximumProductSubarrayTestCase",
  MaximumProductSubarraySchema
);

export default MaximumProductSubarrayTestCase;
