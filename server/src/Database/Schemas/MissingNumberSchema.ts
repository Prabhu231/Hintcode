import IBaseTestCase from "./BaseSchema";
import { Schema, model, Document } from "mongoose";

interface IMissingNumberTestCase extends IBaseTestCase {
    input: {
        nums: number[]; 
    };
    expected_output: number; 
    code: string;
    bestCaseComplexity: string;
    sampleTestcases: string;
}

// Define the Schema properly
const MissingNumberSchema = new Schema<IMissingNumberTestCase>({
    problemName: { type: String, required: true },
    description: { 
        type: String, 
        default: `Given an array nums containing n distinct numbers in the range [0, n], 
        return the only number in the range that is missing from the array.` 
    },
    input: {
        nums: { type: [Number], required: true }, // Array of distinct numbers
    },
    expected_output: { type: Number, required: true }, // The missing number
    code: { 
        type: String, 
        default: `
int missingNumber(vector<int>& nums) {
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
        default: `
Input: nums = [3, 0, 1]
Output: 2

Input: nums = [0, 1]
Output: 2

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8

Input: nums = [0]
Output: 1
        `
    }
});

const MissingNumberTestCase = model<IMissingNumberTestCase & Document>(
    "MissingNumberTestCase", 
    MissingNumberSchema
);

export default MissingNumberTestCase;
