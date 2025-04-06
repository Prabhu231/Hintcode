import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IHouseRobberTestCase extends IBaseTestCase {
  input: {
    nums: number[];  // Array representing money in houses
  };
  expected_output: number; // Maximum money that can be robbed
}

const HouseRobberSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.
Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.
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
Input: nums = [1,2,3,1]
Output: 4

Input: nums = [2,7,9,3,1]
Output: 12

Input: nums = [5,5,10,100,10,5]
Output: 110
    `
  }
});

const HouseRobberTestCase = model<IHouseRobberTestCase>(
  "HouseRobberTestCase",
  HouseRobberSchema
);

export default HouseRobberTestCase;
