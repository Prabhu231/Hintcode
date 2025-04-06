import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IFindDuplicateNumberTestCase extends IBaseTestCase {
  input: {
    nums: number[];
  };
  expected_output: number;
}

const FindDuplicateNumberSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `
Given an array of integers nums containing n + 1 integers where each integer is between 1 and n (inclusive), return the duplicate number.
There is only one repeated number in nums, but it could be repeated multiple times. You must solve the problem without modifying the array nums and use only constant extra space.`,
  },
  input: {
    nums: { type: [Number], required: true }, // Input array
  },
  expected_output: { type: Number, required: true }, // The duplicate number
  code: {
    type: String,
    default: 
    `
/**
 * Given an array nums containing n + 1 integers where each integer is between 1 and n,
 * return the duplicate number.
*/
int findDuplicate(vector<int>& nums) {
  // Complete the function
}
    `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: nums = [1, 3, 4, 2, 2]
Output: 2

Input: nums = [3, 1, 3, 4, 2]
Output: 3

Input: nums = [2, 2, 2, 2, 2]
Output: 2`,
  },
});

const FindDuplicateNumberTestCase = model<IFindDuplicateNumberTestCase>(
  "FindDuplicateNumberTestCase",
  FindDuplicateNumberSchema
);

export default FindDuplicateNumberTestCase;
