import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface INumberOf1BitsTestCase extends IBaseTestCase {
  input: {
    n: number;
  };
  expected_output: number;
}

const NumberOf1BitsSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `Given a positive integer n, return the number of set bits (1s) in its binary representation, also known as the Hamming weight.`,
  },
  input: {
    n: { type: Number, required: true }, // Input number
  },
  expected_output: { type: Number, required: true }, // Number of 1s in binary representation
  code: {
    type: String,
    default: 
    `
int hammingWeight(uint32_t n) {
  // Complete the function
}
    `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(1) (Bit Manipulation approach)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: n = 11  // (binary 1011)
Output: 3

Input: n = 128 // (binary 10000000)
Output: 1

Input: n = 4294967293 // (binary 11111111111111111111111111111101)
Output: 31
      `,
  },
});

const NumberOf1BitsTestCase = model<INumberOf1BitsTestCase>(
  "NumberOf1BitsTestCase",
  NumberOf1BitsSchema
);

export default NumberOf1BitsTestCase;
