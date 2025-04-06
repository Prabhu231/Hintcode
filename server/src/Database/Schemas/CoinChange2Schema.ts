import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ICoinChange2TestCase extends IBaseTestCase {
  input: {
    coins: number[]; 
    amount: number; 
  };
  expected_output: number; 
}

const CoinChange2Schema = new Schema({
  problemName: { type: String, required: true, default: "Coin Change 2" },
  description: {
    type: String,
    default:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0. You may assume that you have an infinite number of each kind of coin.",
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
int coinChange2(vector<int>& coins, int amount) {
  // Complete the function
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N * amount)", 
  },
  sampleTestcases: {
    type: String,
    default:
      `
Input: coins = [1, 2, 5], amount = 5
Output: 4
Explanation: There are 4 ways to make change for 5:
1. 5
2. 2 + 2 + 1
3. 2 + 1 + 1 + 1
4. 1 + 1 + 1 + 1 + 1

Input: coins = [2], amount = 3
Output: 0
Explanation: There is no way to make change for 3 using only coin 2.

Input: coins = [10], amount = 10
Output: 1
Explanation: Only 1 way to make change for 10: 10

Input: coins = [1], amount = 0
Output: 1
Explanation: There is only 1 way to make change for 0: using no coins
    `,
  },
});

const CoinChange2TestCase = model<ICoinChange2TestCase>("CoinChange2TestCase", CoinChange2Schema);

export default CoinChange2TestCase;
