import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IPartitionEqualSubsetSumTestCase extends IBaseTestCase {
  input: {
    nums: number[];
  };
  expected_output: boolean;
}

const PartitionEqualSubsetSumSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.",
  },
  input: {
    nums: { type: [Number], required: true },
  },
  expected_output: { type: Boolean, required: true },
  code: {
    type: String,
    default: 
    `
bool canPartition(vector<int>& nums) {
  // Complete the function
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(n * sum(nums))",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: nums = [1,5,11,5]
Output: true

Input: nums = [1,2,3,5]
Output: false

Input: nums = [2, 2, 1, 1]
Output: true

Input: nums = [3, 3, 3, 4, 5]
Output: true

Input: nums = [1, 2, 5]
Output: false
    `,
  },
});

const PartitionEqualSubsetSumTestCase = model<IPartitionEqualSubsetSumTestCase>(
  "PartitionEqualSubsetSumTestCase",
  PartitionEqualSubsetSumSchema
);

export default PartitionEqualSubsetSumTestCase;
