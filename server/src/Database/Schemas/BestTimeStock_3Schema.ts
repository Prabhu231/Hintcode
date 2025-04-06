import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IBestTimeStock3TestCase extends IBaseTestCase {
  input: {
    prices: number[];
  };
  expected_output: number;
}

const BestTimeStock3Schema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
You are given an array prices where prices[i] is the price of a given stock on the ith day.
Find the maximum profit you can achieve. You may complete at most two transactions.
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
`,
  },
  input: {
    prices: { type: [Number], required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: `
int maxProfit(vector<int>& prices) {
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
    default: `
Input: prices = [1,2,3,4,5]
Output: 4

Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
    `,
  },
});

const BestTimeStock3TestCase = model<IBestTimeStock3TestCase>(
  "BestTimeStock3TestCase",
  BestTimeStock3Schema
);

export default BestTimeStock3TestCase;
