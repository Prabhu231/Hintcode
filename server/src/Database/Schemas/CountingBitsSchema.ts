import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ICountingBitsTestCase extends IBaseTestCase {
    input: {
        n: number;  
    };
    expected_output: number[];  
}

const CountingBitsSchema = new Schema({
    problemName: { type: String, required: true },
    description: {
        type: String,
        default: `
Given an integer n, return an array ans of length n + 1 such that 
for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
`
    },
    input: {
        n: { type: Number, required: true }  
    },
    expected_output: { type: [Number], required: true }, 
    code: {
        type: String,
        default: `
vector<int> countBits(int n) {
    // Complete the function
}
        `
    },
    bestCaseComplexity: {
        type: String,
        default: "O(n)", 
    },
    sampleTestcases: {
        type: String,
        default: `
Input: n = 2
Output: [0,1,1]

Input: n = 5
Output: [0,1,1,2,1,2]

Input: n = 0
Output: [0]
        `
    }
});

const CountingBitsTestCase = model<ICountingBitsTestCase>(
    "CountingBitsTestCase",
    CountingBitsSchema
);

export default CountingBitsTestCase;
