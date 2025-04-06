import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface INetworkDelayTimeTestCase extends IBaseTestCase {
  input: {
    n: number; // Number of nodes
    times: [number, number, number][]; 
    k: number;
  };
  expected_output: number;
}

const NetworkDelayTimeSchema = new Schema({
  problemName: { type: String, required: true, default: "Network Delay Time" },
  description: {
    type: String,
    default: `You are given a network of n nodes, labeled from 1 to n. You are also given times, 
    a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, 
    vi is the target node, and wi is the time it takes for a signal to travel from source to target.

    We will send a signal from a given node k. Return the minimum time it takes for all the n nodes 
    to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.`,
  },
  input: {
    n: { type: Number, required: true },
    times: { type: [[Number]], required: true }, 
    k: { type: Number, required: true },
  },
  expected_output: { type: Number, required: true },
  code: {
    type: String,
    default: `  
int networkDelayTime(vector<vector<int>>& times, int n, int k) {
  // Complete the function
}
  `,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(N log N) (Dijkstra's Algorithm) / O(N^2) (Bellman-Ford)",
  },
  sampleTestcases: {
    type: String,
    default: `
Input:
n = 4, k = 2
times = [[2,1,1], [2,3,1], [3,4,1]]
Output:
2

Input:
n = 3, k = 1
times = [[1,2,1], [2,3,2], [1,3,4]]
Output:
3

Input:
n = 3, k = 1
times = [[1,2,1]]
Output:
-1
    `,
  },
});

const NetworkDelayTimeTestCase = model<INetworkDelayTimeTestCase>(
  "NetworkDelayTimeTestCase",
  NetworkDelayTimeSchema
);

export default NetworkDelayTimeTestCase;
