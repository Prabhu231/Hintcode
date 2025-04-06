import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ILongestCommonSubsequenceTestCase extends IBaseTestCase {
  input: {
    text1: string;
    text2: string;
  };
  expected_output: number;
}

const LongestCommonSubsequenceSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given two strings text1 and text2, return the length of their longest common subsequence.",
  },
  input: {
    text1: { type: String, required: true },
    text2: { type: String, required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: 
    `int longestCommonSubsequence(string text1, string text2) {
    // Complete the function
    }`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(m*n)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
    Input: text1 = "abcde", text2 = "ace"
    Output: 3

    Input: text1 = "abc", text2 = "abc"
    Output: 3

    Input: text1 = "abc", text2 = "def"
    Output: 0
    `,
  },
});

const LongestCommonSubsequenceTestCase = model<ILongestCommonSubsequenceTestCase>(
  "LongestCommonSubsequenceTestCase",
  LongestCommonSubsequenceSchema
);

export default LongestCommonSubsequenceTestCase;
