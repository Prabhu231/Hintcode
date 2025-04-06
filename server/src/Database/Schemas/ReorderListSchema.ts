import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IReorderListTestCase extends IBaseTestCase {
  input: {
    head: number[];
  };
  expected_output: number[];
}

const ReorderListSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `
You are given the head of a singly linked list. Reorder the list to follow the pattern: 
first node → last node → second node → second last node → third node → ...
You must do this in-place without modifying the node values.`,
  },
  input: {
    head: { type: [Number], required: true }, // Representing the linked list as an array
  },
  expected_output: { type: [Number], required: true }, // The reordered linked list as an array
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
void reorderList(ListNode* head) {
  // Complete the function
}
    `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: head = [1, 2, 3, 4]
Output: [1, 4, 2, 3]

Input: head = [1, 2, 3, 4, 5]
Output: [1, 5, 2, 4, 3]

Input: head = [1]
Output: [1]`  
  },
});

const ReorderListTestCase = model<IReorderListTestCase>(
  "ReorderListTestCase",
  ReorderListSchema
);

export default ReorderListTestCase;
