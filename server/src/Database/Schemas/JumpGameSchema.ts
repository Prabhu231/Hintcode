import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IJumpGameTestCase extends IBaseTestCase {
  input: {
    nums: number[];  // Array of integers
  };
  expected_output: boolean;  // Whether you can reach the last index or not
}

const JumpGameSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given an array of non-negative integers nums, where each element represents the maximum jump length from that position, return true if you can reach the last index, otherwise return false.",
  },
  input: {
    nums: { type: [Number], required: true },  
  },
  expected_output: { type: Boolean, required: true },  
  code: {
    type: String,
    default:
    `
bool canJump(vector<int>& nums) {
  // Complete the function
}
`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(n)",
  },
  sampleTestcases: {
    type: String,
    default:
      `
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always be able to reach index 3, but you can't move further.
    `,
  },
});

const JumpGameTestCase = model<IJumpGameTestCase>(
  "JumpGameTestCase",
  JumpGameSchema
);

export default JumpGameTestCase;
