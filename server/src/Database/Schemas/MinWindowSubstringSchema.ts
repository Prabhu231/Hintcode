import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IMinWindowSubstringTestCase extends IBaseTestCase {
    input: {
        s: string;
        t: string;
    };
    expected_output: string;
}

const MinWindowSubstringSchema = new Schema({
    problemName: { type: String, required: true },
    description: {
        type: String,
        default: "Given two strings s and t, find the minimum window in s that contains all characters of t."
    },
    input: {
        s: { type: String, required: true },
        t: { type: String, required: true },
    },
    expected_output: { type: String, default: "" },
    code: { 
        type: String, 
        default: 
        `
string minWindow(string s, string t) {
  // Complete the function 
}`
    },
    bestCaseComplexity: { 
        type: String, 
        default: "O(n)" 
    },
    sampleTestcases: {
        type: String,
        default: `
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Input: s = "a", t = "a"
Output: "a"

Input: s = "a", t = "aa"
Output: ""

Input: s = "abc", t = "ac"
Output: "abc"
    `
    }
});

const MinWindowSubstringTestCase = model<IMinWindowSubstringTestCase>(
    "MinWindowSubstringTestCase",
    MinWindowSubstringSchema
);

export default MinWindowSubstringTestCase;
