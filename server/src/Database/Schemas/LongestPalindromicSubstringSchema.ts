import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ILongestPalindromicSubstringTestCase extends IBaseTestCase {
  input: {
    s: string;
  };
  expected_output: string;
}

const LongestPalindromicSubstringSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: `
    Given a string s, return the longest palindromic substring in s.
    A string is a palindrome if it reads the same forward and backward.
    `
  },
  input: {
    s: { type: String, required: true },
  },
  expected_output: { type: String, required: true }, 
  code: {
    type: String,
    default: `
string longestPalindrome(string s) {
  // Implement your solution here
}
    `
  },
  bestCaseComplexity: {
    type: String,
    default: "O(n^2)", 
  },
  sampleTestcases: {
    type: String,
    default: `
Input: s = "babad"
Output: "bab" (or "aba")

Input: s = "cbbd"
Output: "bb"

Input: s = "a"
Output: "a"

Input: s = "ac"
Output: "a" (or "c")
    `
  }
});

const LongestPalindromicSubstringTestCase = model<ILongestPalindromicSubstringTestCase>(
  "LongestPalindromicSubstringTestCase",
  LongestPalindromicSubstringSchema
);

export default LongestPalindromicSubstringTestCase;
