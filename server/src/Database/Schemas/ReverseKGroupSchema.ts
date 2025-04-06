import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IReverseKGroupTestCase extends IBaseTestCase {
  input: {
    head: number[];
    k: number;
  };
  expected_output: number[];
}

const ReverseKGroupSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `Given a linked list, reverse the nodes of a linked list k at a time and return its modified list.
      k is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as they are.`,
  },
  input: {
    head: { type: [Number], required: true },
    k: { type: Number, required: true }, 
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
ListNode* reverseKGroup(ListNode* head, int k) {
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
Input: head = [1, 2, 3, 4, 5], k = 2
Output: [2, 1, 4, 3, 5]

Input: head = [1, 2, 3, 4, 5], k = 3
Output: [3, 2, 1, 4, 5]

Input: head = [1], k = 1
Output: [1]`,
  },
});

const ReverseKGroupTestCase = model<IReverseKGroupTestCase>(
  "ReverseKGroupTestCase",
  ReverseKGroupSchema
);

export default ReverseKGroupTestCase;
