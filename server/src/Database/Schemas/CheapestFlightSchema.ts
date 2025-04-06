import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ICheapestFlightTestCase extends IBaseTestCase {
  input: {
    n: number; 
    flights: number[][]; 
    src: number; 
    dst: number; 
    k: number; 
  };
  expected_output: number;
}

const CheapestFlightSchema = new Schema({
  problemName: { type: String, required: true },
  description: {
    type: String,
    default:
      `
Given n cities and a list of flights where each flight is represented as [from, to, price], find the cheapest price from src to dst with at most k stops.
Return -1 if the destination is not reachable within k stops.
`,
  },
  input: {
    n: { type: Number, required: true },
    flights: { type: [[Number]], required: true }, 
    src: { type: Number, required: true },
    dst: { type: Number, required: true },
    k: { type: Number, required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: 
    `
int findCheapestPrice(int n, vector<vector<int>> flights, int src, int dst, int k) {
// Complete the function 
}
`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O((n + e) log n)", 
  },
  sampleTestcases: {
    type: String,
    default: 
      `
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200

Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500

Input: n = 4, flights = [[0,1,100],[1,2,100],[2,3,100],[0,3,500]], src = 0, dst = 3, k = 1
Output: 300

Input: n = 5, flights = [[0,1,200],[1,2,300],[2,3,400],[3,4,500],[0,4,1500]], src = 0, dst = 4, k = 2
Output: 900

Input: n = 3, flights = [[0,1,300],[1,2,500]], src = 0, dst = 2, k = 1
Output: 800
    `,
  },
});

const CheapestFlightTestCase = model<ICheapestFlightTestCase>(
  "CheapestFlightTestCase",
  CheapestFlightSchema
);

export default CheapestFlightTestCase;
