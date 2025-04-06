import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IPalindromicSubstringsTestCase extends IBaseTestCase {
  input: {
    s: string;
  };
  expected_output: number;
}

const PalindromicSubstringsSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given a string s, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within a string. A palindrome is a string that reads the same forward and backward.",
  },
  input: {
    s: { type: String, required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: 
    `
int countSubstrings(string s) {
  // Complete the function 
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(n^2)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: s = "abc"
Output: 3
Explanation: Three palindromic substrings: "a", "b", "c".

Input: s = "aaa"
Output: 6
Explanation: Six palindromic substrings: "a", "a", "a", "aa", "aa", "aaa".

Input: s = "racecar"
Output: 10
Explanation: Ten palindromic substrings: "r", "a", "c", "e", "c", "a", "r", "cec", "aceca", "racecar".
  `,
  },
});

const PalindromicSubstringsTestCase = model<IPalindromicSubstringsTestCase>(
  "PalindromicSubstringsTestCase",
  PalindromicSubstringsSchema
);

export default PalindromicSubstringsTestCase;
