import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IRemoveNthNodeTestCase extends IBaseTestCase {
  input: {
    head: number[];
    n: number;
  };
  expected_output: number[];
}

const RemoveNthNodeSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `Given the head of a linked list, remove the nth node from the end of the list and return its head.`,
  },
  input: {
    head: { type: [Number], required: true }, // Represent the linked list as an array
    n: { type: Number, required: true }, // The position of the node to be removed from the end
  },
  expected_output: { type: [Number], required: true }, // The modified linked list after removal
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
ListNode* removeNthFromEnd(ListNode* head, int n) {
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
Input: head = [1, 2, 3, 4, 5], n = 2
Output: [1, 2, 3, 5]

Input: head = [1], n = 1
Output: []

Input: head = [1, 2], n = 1
Output: [1]`,
  },
});

const RemoveNthNodeTestCase = model<IRemoveNthNodeTestCase>(
  "RemoveNthNodeTestCase",
  RemoveNthNodeSchema
);

export default RemoveNthNodeTestCase;
