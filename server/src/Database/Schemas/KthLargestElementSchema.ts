import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IKthLargestTestCase extends IBaseTestCase {
  input: {
    nums: number[];
    k: number;
  };
  expected_output: number;
}

const KthLargestSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `
Given an integer array nums and an integer k, return the kth largest element in the array.
Note that it is the kth largest element in sorted order, not the kth distinct element.`,
  },
  input: {
    nums: { type: [Number], required: true }, // The given array
    k: { type: Number, required: true }, // The value of k
  },
  expected_output: { type: Number, required: true }, // The kth largest element in the array
  code: {
    type: String,
    default: 
    `
int findKthLargest(vector<int>& nums, int k) {
  // Complete the function
}
    `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N log K)", 
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

Input: nums = [1], k = 1
Output: 1`,
  },
});

const KthLargestTestCase = model<IKthLargestTestCase>(
  "KthLargestTestCase",
  KthLargestSchema
);

export default KthLargestTestCase;
