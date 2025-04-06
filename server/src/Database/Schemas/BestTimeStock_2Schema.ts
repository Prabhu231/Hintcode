import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IBestTimeStock2TestCase extends IBaseTestCase {
  input: {
    prices: number[];
  };
  expected_output: number;
}

const BestTimeStock2Schema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
You are given an integer array prices where prices[i] is the price of a given stock on the ith day.
On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.
Find and return the maximum profit you can achieve.
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
Input: prices = [7,1,5,3,6,4]
Output: 7

Input: prices = [1,2,3,4,5]
Output: 4
    `,
  },
});

const BestTimeStock2TestCase = model<IBestTimeStock2TestCase>(
  "BestTimeStock2TestCase",
  BestTimeStock2Schema
);

export default BestTimeStock2TestCase;
