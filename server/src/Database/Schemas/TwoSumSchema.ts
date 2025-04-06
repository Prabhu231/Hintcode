import IBaseTestCase from "./BaseSchema";
import { Schema, model, Document } from "mongoose";

interface ITwoSumTestCase extends IBaseTestCase {
    input: {
        nums: number[];
        target: number;
    };
    expected_output: number[];
    code: string;
    bestCaseComplexity: string;
    sampleTestcases: string;
}


const TwoSumSchema = new Schema<ITwoSumTestCase>({
    problemName: { type: String, required: true },
    description: { type: String, required: true },
    input: {
        nums: { type: [Number], required: true },
        target: { type: Number, required: true },
    },
    expected_output: { type: [Number], required: true },
    code: { 
        type: String, 
        default: `
vector<int> twoSum(vector<int>& nums, int target) {
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
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]

Input: nums = [3, 2, 4], target = 6
Output: [1, 2]

Input: nums = [1, 3, 5, 10], target = 8
Output: [1, 2]

Input: nums = [3, 1, 0, 2, 6, 65, 20, 10], target = 22
Output: [3, 6]
      `
  }
});

const TwoSumTestCase = model<ITwoSumTestCase & Document>("TwoSumTestCase", TwoSumSchema);

export default TwoSumTestCase;
