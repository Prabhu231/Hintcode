import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IBestTimeStock4TestCase extends IBaseTestCase {
  input: {
    prices: number[];
    k: number;
  };
  expected_output: number;
}

const BestTimeStock4Schema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.
Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
`,
  },
  input: {
    prices: { type: [Number], required: true },
    k: {type: Number, required: true}
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: `
int maxProfit(int k, vector<int> prices) {
    // Complete the function
}
  `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(n * k)",
  },
  sampleTestcases: {
    type: String,
    default: `
Input: k = 2, prices = [2,4,1]
Output: 2

Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
    `,
  },
});

const BestTimeStock4TestCase = model<IBestTimeStock4TestCase>(
  "BestTimeStock4TestCase",
  BestTimeStock4Schema
);

export default BestTimeStock4TestCase;
