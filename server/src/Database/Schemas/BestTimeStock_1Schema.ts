import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IBestTimeStock1TestCase extends IBaseTestCase {
  input: {
    prices: number[];
  };
  expected_output: number;
}

const BestTimeStock1Schema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.
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
Input: prices = [7,6,4,3,1]
Output: 
Input: prices = [7,1,5,3,6,4]
Output: 5
    `,
  },
});

const BestTimeStock1TestCase = model<IBestTimeStock1TestCase>(
  "BestTimeStock1TestCase",
  BestTimeStock1Schema
);

export default BestTimeStock1TestCase;
