import { Job, Worker } from "bullmq";
import IORedis from "ioredis";
import { ProblemId } from "../Validate/ProblemId";
import { runTests } from "../Validate/Tests";
import { setCompletedJob, setFailedJob } from "../Redis/redis";
import dotenv from "dotenv";

dotenv.config();


const redisConnection = new IORedis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null, 
});

const executeCode = async (job: Job) => {
    // console.log("Executing job id: ", job.id)
    const prblm = job.data.problem
    const code = job.data.code
    if(prblm == ProblemId.TwoSum) {
        const val = await runTests.TwoSum(code);
        // console.log("val: ", val)
        return val
    }
    if(prblm == ProblemId.LongestSubstring) {
        const val = await runTests.LongestSubstring(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.BestTimeStock1) {
        const val = await runTests.BestTimeStock1(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.BestTimeStock2) {
        const val = await runTests.BestTimeStock2(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.BestTimeStock3) {
        const val = await runTests.BestTimeStock3(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.BestTimeStock4) {
        const val = await runTests.BestTimeStock4(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.SudokuSolver) {
        const val = await runTests.SudokuSolver(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.MinPathSum) {
        const val = await runTests.MinPathSum(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.DungeonGame) {
        const val = await runTests.DungeonGame(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.LongestIncPath) {
        const val = await runTests.LongestIncPath(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.ValidParentheses) {
        const val = await runTests.ValidParentheses(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.GenerateParentheses) {
        const val = await runTests.GenerateParentheses(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.MedianSortedArr) {
        const val = await runTests.MedianSortedArr(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.MinWindowSubstring) {
        const val = await runTests.MinWindowSubstring(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.SlidingWindowMax) {
        const val = await runTests.SlidingWindowMax(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.LastStoneWeight) {
        const val = await runTests.LastStoneWeight(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.ReverseLinkedList) {
        const val = await runTests.ReverseLinkedList(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.MergeTwoLinkedLists) {
        const val = await runTests.MergeTwoLinkedLists(code)
        // console.log(val)
        return val
    }
    if (prblm == ProblemId.ReverseKGroup) {
        const val = await runTests.ReverseKGroup(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.LinkedListCycle) {
        const val = await runTests.LinkedlistCycle(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.ReorderList) {
        const val = await runTests.ReorderList(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.RemoveNthNode) {
        const val = await runTests.RemoveNthNode(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.AddTwoNumbers) {
        const val = await runTests.AddTwoNumbers(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.FindDuplicateNumber) {
        const val = await runTests.FindDuplicateNumber(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.KthLargestElement) {
        const val = await runTests.KthLargestElement(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.WordSearch) {
        const val = await runTests.WordSearch(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.WordSearch) {
        const val = await runTests.WordSearch(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.WordSearch2) {
        const val = await runTests.WordSearch2(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.ClimbStairs) {
        const val = await runTests.ClimbStairs(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.HouseRobber) {
        const val = await runTests.HouseRobber(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.HouseRobber2) {
        const val = await runTests.HouseRobber2(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.LongestPalSubstring) {
        const val = await runTests.LongestPalSubstring(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.PalSubstring) {
        const val = await runTests.PalSubstring(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.CoinChange) {
        const val = await runTests.CoinChange(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.MaxProdSubarray) {
        const val = await runTests.MaxProdSubarray(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.LIS) {
        const val = await runTests.LIS(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.PartEqSubset) {
        const val = await runTests.PartEqSubset(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.LCS) {
        const val = await runTests.LCS(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.CoinChange2) {
        const val = await runTests.CoinChange2(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.MaxSubarray) {
        const val = await runTests.MaxSubarray(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.JumpGame) {
        const val = await runTests.JumpGame(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.JumpGame2) {
        const val = await runTests.JumpGame2(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.HammingWeight) {
        const val = await runTests.HammingWeight(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.CountingBits) {
        const val = await runTests.CountingBits(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.ReverseBits) {
        const val = await runTests.ReverseBits(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.MissingNumber) {
        const val = await runTests.MissingNumber(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.NetworkDelayTime) {
        const val = await runTests.NetworkDelayTime(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.CourseSchedule) {
        const val = await runTests.CourseSchedule(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.CheapestFlight) {
        const val = await runTests.CheapestFlight(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.NumberOfIslands) {
        const val = await runTests.NumberOfIslands(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.RottingOranges) {
        const val = await runTests.RottingOranges(code)
        // console.log(val)
        return val
    }
    if(prblm == ProblemId.MaxAreaOfIsland) {
        const val = await runTests.MaxAreaOfIsland(code)
        // console.log(val)
        return val
    }
    return "Invalid problem ID";
}

const worker = new Worker(
  "code_executor",
  executeCode,
  { connection: redisConnection }
);

worker.on("completed", (job: Job) => {
    if(!job || !job.id) {
        return
    }
    // console.log(`Job ${job.id} completed`);
    setCompletedJob(job.id, job.returnvalue);
})

worker.on("failed", (job: Job<any, any, string> | undefined) => {
    if (!job || !job.id) {
        console.warn("Failed job or job ID is undefined!");
        return;
    }
    // console.log(`Job ${job.id} failed with reason: ${job.failedReason}`);
    setFailedJob(job.id, job.failedReason);
});

