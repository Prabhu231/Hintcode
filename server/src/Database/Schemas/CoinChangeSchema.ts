import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ICoinChangeTestCase extends IBaseTestCase {
  input: {
    coins: number[]; 
    amount: number;  
  };
  expected_output: number;
}

const CoinChangeSchema = new Schema({
  problemName: { type: String, required: true, default: "Coin Change" },
  description: {
    type: String,
    default: 
      `
You are given an integer array coins representing coins of different denominations 
and an integer amount representing a total amount of money. 
Return the fewest number of coins that you need to make up that amount. 
If that amount cannot be made up by any combination of the coins, return -1.`,
  },
  input: {
    coins: { type: [Number], required: true }, 
    amount: { type: Number, required: true }, 
  },
  expected_output: { type: Number, required: true }, 
  code: {
    type: String,
    default: 
    `
int coinChange(vector<int>& coins, int amount) {
  // Complete the function
}
    `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N * amount)", 
  },
  sampleTestcases: {
    type: String,
    default: 
      `Input: coins = [1, 2, 5], amount = 11
      Output: 3
      Explanation: 11 = 5 + 5 + 1

      Input: coins = [2], amount = 3
      Output: -1

      Input: coins = [1], amount = 0
      Output: 0`,
  },
});

const CoinChangeTestCase = model<ICoinChangeTestCase>(
  "CoinChangeTestCase",
  CoinChangeSchema
);

export default CoinChangeTestCase;
