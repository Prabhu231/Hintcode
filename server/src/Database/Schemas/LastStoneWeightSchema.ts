import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ILastStoneWeightTestCase extends IBaseTestCase {
  input: {
    stones: number[];
  };
  expected_output: number;
}

const LastStoneWeightSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
     `You are given an array of integers stones where stones[i] is the weight of the ith stone.

We are playing a game with the stones. On each turn, we choose the heaviest two stones and smash them together. Suppose the heaviest two stones have weights x and y with x <= y. The result of this smash is:

If x == y, both stones are destroyed, and
If x != y, the stone of weight x is destroyed, and the stone of weight y has new weight y - x.
At the end of the game, there is at most one stone left.

Return the weight of the last remaining stone. If there are no stones left, return 0.`
  },
  input: {
    stones: { type: [Number], required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: 
    `
int lastStoneWeight(vector<int> stones) {
    // Complete the function
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N log N)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: stones = [2, 7, 4, 1, 8, 1]
Output: 1

Input: stones = [1]
Output: 1

Input: stones = [3, 7, 2]
Output: 2
      `,
  },
});

const LastStoneWeightTestCase = model<ILastStoneWeightTestCase>(
  "LastStoneWeightTestCase",
  LastStoneWeightSchema
);

export default LastStoneWeightTestCase;
