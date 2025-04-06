import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IMedianOfTwoSortedArraysTestCase extends IBaseTestCase {
  input: {
    nums1: number[];
    nums2: number[];
  };
  expected_output: number;
}

const MedianOfTwoSortedArraysSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
  },
  input: {
    nums1: { type: [Number], required: true },
    nums2: { type: [Number], required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: 
    `
double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
  // Complete the function
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(log(min(m, n)))",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: nums1 = [1, 3], nums2 = [2]
Output: 2.0

Input: nums1 = [1, 2], nums2 = [3, 4]
Output: 2.5

Input: nums1 = [0, 0], nums2 = [0, 0]
Output: 0.0
      `,
  },
});

const MedianOfTwoSortedArraysTestCase = model<IMedianOfTwoSortedArraysTestCase>(
  "MedianOfTwoSortedArraysTestCase",
  MedianOfTwoSortedArraysSchema
);

export default MedianOfTwoSortedArraysTestCase;
