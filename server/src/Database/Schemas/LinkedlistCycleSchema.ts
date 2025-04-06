import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ILinkedListCycleTestCase extends IBaseTestCase {
  input: {
    head: number[];
    pos: number;
  };
  expected_output: boolean; 
}

const LinkedListCycleSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `
Given the head of a linked list, determine if the linked list has a cycle in it.
A cycle occurs when a node in the list points back to a previous node, forming a loop.
Return true if a cycle exists, otherwise return false.` 
  },
  input: {
    head: { type: [Number], required: true }, 
    pos: { type: Number, required: true }, 
  },
  expected_output: { type: Boolean, required: true }, 
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
bool hasCycle(ListNode *head) {
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
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: The tail connects to the second node (0-indexed).

Input: head = [1,2], pos = 0
Output: true
Explanation: The tail connects to the first node.

Input: head = [1], pos = -1
Output: false
Explanation: No cycle.`,
  },
});

const LinkedListCycleTestCase = model<ILinkedListCycleTestCase>(
  "LinkedListCycleTestCase",
  LinkedListCycleSchema
);

export default LinkedListCycleTestCase;
