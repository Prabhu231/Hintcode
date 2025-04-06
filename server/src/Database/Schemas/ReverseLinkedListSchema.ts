import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IReverseLinkedListTestCase extends IBaseTestCase {
  input: {
    head: number[];
  };
  expected_output: number[]; 
}

const ReverseLinkedListSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `Given the head of a singly linked list, reverse the list and return its head.
      A singly linked list is a data structure where each node has a value and a pointer to the next node in the list. Reversing the list means reversing the direction of the pointers, so that the head of the list becomes the tail, and the tail becomes the head.`,
  },
  input: {
    head: { type: [Number], required: true }, // Represent the linked list as an array
  },
  expected_output: { type: [Number], required: true }, // The reversed linked list as an array
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
ListNode* reverseList(ListNode* head) {
  // Complete the function
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N)",
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: head = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]

Input: head = [1]
Output: [1]

Input: head = [2, 1]
Output: [1, 2]`,
  },
});

const ReverseLinkedListTestCase = model<IReverseLinkedListTestCase>(
  "ReverseLinkedListTestCase",
  ReverseLinkedListSchema
);

export default ReverseLinkedListTestCase;
