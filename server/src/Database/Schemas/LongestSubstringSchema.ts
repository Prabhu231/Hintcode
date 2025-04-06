import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ILongestSubstringTestCase extends IBaseTestCase {
    input: {
      s: string;
    };
    expected_output: number;
  }
  
  const LongestSubstringSchema = new Schema({
    problemName: { type: String, required: true },
    description: {
      type: String,
      default: 'Given a string s, find the length of the longest substring without duplicate characters.'
    },
    input: {
      s: { type: String, required: true },
    },
    expected_output: { type: Number, required: true },
    code: { 
      type: String, 
      default: 
      `
int longestSubstring(string s) {
  // Complete the function 
}
      `
   
  },
  bestCaseComplexity: { 
      type: String, 
      default: "O(n)" 
  },
  sampleTestcases: {
    type: String,
    default:
        ` 
Input: s = "abcabcbb"
Output: 3

Input: s = "bbbbb"
Output: 1

Input: s = "pwwkew"
Output: 3

Input: s = ""
Output: 0
    `
  }
  });
  
  const LongestSubstringTestCase = model<ILongestSubstringTestCase>(
    "LongestSubstringTestCase",
    LongestSubstringSchema
  );

  export default LongestSubstringTestCase;