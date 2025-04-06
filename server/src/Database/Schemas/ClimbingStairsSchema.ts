import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IClimbingStairsTestCase extends IBaseTestCase {
  input: {
    n: number;
  };
  expected_output: number;
}

const ClimbingStairsSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
    You are climbing a staircase. It takes n steps to reach the top.
    Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
    `,
  },
  input: {
    n: { type: Number, required: true }, // Number of steps
  },
  expected_output: { type: Number, required: true }, // Number of ways to reach the top
  code: {
    type: String,
    default: `
int climbStairs(int n) {
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
    default: `
Input: n = 2
Output: 2
Explanation: 1 step + 1 step OR 2 steps

Input: n = 3
Output: 3
Explanation: 1+1+1, 1+2, 2+1

Input: n = 4
Output: 5
Explanation: 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2
    `,
  },
});

const ClimbingStairsTestCase = model<IClimbingStairsTestCase>(
  "ClimbingStairsTestCase",
  ClimbingStairsSchema
);

export default ClimbingStairsTestCase;
