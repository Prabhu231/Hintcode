import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IGenerateParenthesesTestCase extends IBaseTestCase {
  input: {
    n: number;
  };
  expected_output: string[];
}

const GenerateParenthesesSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given n pairs of parentheses, write a function to generate all valid combinations of well-formed parentheses.",
  },
  input: {
    n: { type: Number, required: true },
  },
  expected_output: { type: [String], required: true },
  code: {
    type: String,
    default: 
    `
vector<string> generateParenthesis(int n) {
// Complete the function 
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(4^n / sqrt(n))",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: n = 1
Output: ["()"]

Input: n = 2
Output: ["(())", "()()"]

Input: n = 3
Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]
    `,
  },
});

const GenerateParenthesesTestCase = model<IGenerateParenthesesTestCase>(
  "GenerateParenthesesTestCase",
  GenerateParenthesesSchema
);

export default GenerateParenthesesTestCase;
