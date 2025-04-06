import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IAddTwoNumbersTestCase extends IBaseTestCase {
  input: {
    l1: number[]; 
    l2: number[]; 
  };
  expected_output: number[]; 
}

const AddTwoNumbersSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `
You are given two non-empty linked lists representing two non-negative integers. 
The digits are stored in reverse order, and each of their nodes contains a single digit. 
Add the two numbers and return the sum as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
`,
  },
  input: {
    l1: { type: [Number], required: true }, 
    l2: { type: [Number], required: true }, 
  },
  expected_output: { type: [Number], required: true }, 
  code: {
    type: String,
    default: 
    `
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Complete the function
    }
        `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(max(N, M))", // N and M are the lengths of the two lists
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]

Input: l1 = [0], l2 = [0]
Output: [0]

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]`,
  },
});

const AddTwoNumbersTestCase = model<IAddTwoNumbersTestCase>(
  "AddTwoNumbersTestCase",
  AddTwoNumbersSchema
);

export default AddTwoNumbersTestCase;
