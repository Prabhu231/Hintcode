import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IHouseRobber2TestCase extends IBaseTestCase {
  input: {
    nums: number[];
  };
  expected_output: number;
}

const HouseRobber2Schema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
You are a professional robber planning to rob houses along a circular street. Each house has a certain amount of money stashed, but adjacent houses have security systems that will alert the police if both are robbed in the same night.
Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob without alerting the police.
Since the houses are arranged in a circle, the first and last houses are adjacent.
    `
  },
  input: {
    nums: { type: [Number], required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: `
int rob(vector<int>& nums) {
  // Implement your solution here
}
    `
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N)",
  },
  sampleTestcases: {
    type: String,
    default: `
Input: nums = [2,3,2]
Output: 3

Input: nums = [1,2,3,1]
Output: 4

Input: nums = [2,7,9,3,1]
Output: 11
    `
  }
});

const HouseRobber2TestCase = model<IHouseRobber2TestCase>(
  "HouseRobber2TestCase",
  HouseRobber2Schema
);

export default HouseRobber2TestCase;
