import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IJumpGame2TestCase extends IBaseTestCase {
  input: {
    nums: number[];
  };
  expected_output: number;
}

const JumpGame2Schema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `
You are given a 0-indexed array of integers nums of length n. 
You are initially positioned at nums[0].
Each element nums[i] represents the maximum length of a forward jump from index i.
Return the minimum number of jumps to reach nums[n - 1].`,
  },
  input: {
    nums: { type: [Number], required: true },
  },
  expected_output: { type: Number, required: true }, 
  code: {
    type: String,
    default: 
    `
int jump(vector<int>& nums) {
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
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
Input: nums = [2,3,0,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2.
    `,
  },
});

const JumpGame2TestCase = model<IJumpGame2TestCase>(
  "JumpGame2TestCase",
  JumpGame2Schema
);

export default JumpGame2TestCase;
