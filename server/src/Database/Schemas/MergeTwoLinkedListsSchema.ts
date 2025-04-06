import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IMergeTwoSortedLinkedListsTestCase extends IBaseTestCase {
  input: {
    list1: number[];  
    list2: number[];  
  };
  expected_output: number[];  
}

const MergeTwoSortedLinkedListsSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default: 
      `Given the heads of two sorted linked lists, merge the two lists into one sorted list. 
      The list should be made by splicing together the nodes of the first two lists.`,
  },
  input: {
    list1: { type: [Number], required: true },  
    list2: { type: [Number], required: true },  
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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Complete the function
    }`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N + M)",  
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: list1 = [1, 2, 4], list2 = [1, 3, 4]
Output: [1, 1, 2, 3, 4, 4]

Input: list1 = [], list2 = [0]
Output: [0]

Input: list1 = [5], list2 = [1, 2, 4]
Output: [1, 2, 4, 5]`,
  },
});

const MergeTwoSortedLinkedListsTestCase = model<IMergeTwoSortedLinkedListsTestCase>(
  "MergeTwoSortedLinkedListsTestCase",
  MergeTwoSortedLinkedListsSchema
);

export default MergeTwoSortedLinkedListsTestCase;
