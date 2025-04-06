import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IValidParenthesesTestCase extends IBaseTestCase {
  input: {
    s: string;
  };
  expected_output: boolean;
}

const ValidParenthesesSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
  },
  input: {
    s: { type: String, required: true },
  },
  expected_output: { type: Boolean, required: true },
  code: {
    type: String,
    default: 
    `
bool isValid(string s) {
  // Complete the function 
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(n)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: s = "()"
Output: true

Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false

Input: s = "([)]"
Output: false

Input: s = "{[]}"
Output: true
    `,
  },
});

const ValidParenthesesTestCase = model<IValidParenthesesTestCase>(
  "ValidParenthesesTestCase",
  ValidParenthesesSchema
);

export default ValidParenthesesTestCase;
