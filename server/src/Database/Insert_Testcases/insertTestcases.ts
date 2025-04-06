import connectDB from "../db"
import { connection } from "mongoose"

// Two Sum
import generateTwoSumTestCases from "./Generate_Testcase/Twosum"
import TwoSumTestCase from "../Schemas/TwoSumSchema";

// Longest Substring Without Repeating Characters
import generateLongestSubstringTestCases from "./Generate_Testcase/LongestSubstring";
import LongestSubstringTestCase from "../Schemas/LongestSubstringSchema";

// Best Time to Buy and Sell Stock - 1
import generateBestTimeStock1 from "./Generate_Testcase/BestTimeStock_1";
import BestTimeStock1TestCase from "../Schemas/BestTimeStock_1Schema";

// Best Time to Buy and Sell Stock - 2
import generateBestTimeStock2 from "./Generate_Testcase/BestTimeStock_2";
import BestTimeStock2TestCase from "../Schemas/BestTimeStock_2Schema";

// Best Time to Buy and Sell Stock - 3
import generateBestTimeStock3 from "./Generate_Testcase/BestTimeStock_3";
import BestTimeStock3TestCase from "../Schemas/BestTimeStock_3Schema";

// Best Time to Buy and Sell Stock - 4
import generateBestTimeStock4 from "./Generate_Testcase/BestTimeStock_4";
import BestTimeStock4TestCase from "../Schemas/BestTimeStock_4Schema";

// Sudoku Solver
import generateSudokuSolverTestCases from "./Generate_Testcase/SudokuSolver";
import SudokuSolverTestCase from "../Schemas/SudokuSolverSchema";

// Minimum Path Sum
import generateMinPathSumTestCases from "./Generate_Testcase/MinPathSum";
import MinPathSumTestCase from "../Schemas/MinPathSumSchema";

// Dungeon Game
import generateDungeonGameTestCases from "./Generate_Testcase/DungeonGame";
import DungeonGameTestCase from "../Schemas/DungeonGameSchema";

// Longest Increasing Path
import generateLongestIncreasingPathTestCases from "./Generate_Testcase/LongestIncPath";
import LongestIncreasingPathTestCase from "../Schemas/LongestIncPathSchema";

// Valid Parentheses
import generateValidParenthesesTestCases from "./Generate_Testcase/ValidParentheses";
import ValidParenthesesTestCase from "../Schemas/ValidParenthesesSchema";

// Generate Parentheses
import generateParenthesesTestCases from "./Generate_Testcase/GenerateParentheses";
import GenerateParenthesesTestCase from "../Schemas/GenerateParenthesesSchema";

// Median of Two Sorted Arrays
import generateMedianOfTwoSortedArraysTestCases from "./Generate_Testcase/MedianSortedArr";
import MedianOfTwoSortedArraysTestCase from "../Schemas/MedianSortedArrSchema";

// Minimum Window Substring
import generateMinWindowSubstringTestCases from "./Generate_Testcase/MinWindowSubstring";
import MinWindowSubstringTestCase from "../Schemas/MinWindowSubstringSchema";

// Sliding Window Maximum
import generateSlidingWindowTestCases from "./Generate_Testcase/SlidingWindowMax";
import SlidingWindowMaxTestCase from "../Schemas/SlidingWindowMaxSchema";

// Last Stone Weight
import generateLastStoneWeightTestCases from "./Generate_Testcase/LastStoneWeight";
import LastStoneWeightTestCase from "../Schemas/LastStoneWeightSchema";

// Reverse Linked List
import generateReverseLinkedListTestCases from "./Generate_Testcase/ReverseLinkedList";
import ReverseLinkedListTestCase from "../Schemas/ReverseLinkedListSchema";

// Merge Two Sorted Linked Lists
import generateMergeTwoSortedLinkedListsTestCases from "./Generate_Testcase/MergeTwoLinkedLists";
import MergeTwoSortedLinkedListsTestCase from "../Schemas/MergeTwoLinkedListsSchema";

// Reverse K Group
import generateReverseKGroupTestCases from "./Generate_Testcase/ReverseKGroup";
import ReverseKGroupTestCase from "../Schemas/ReverseKGroupSchema";

// Linked List Cycle
import generateLinkedListCycleTestCases from "./Generate_Testcase/LinkedlistCycle";
import LinkedListCycleTestCase from "../Schemas/LinkedlistCycleSchema";

// Reorder List
import generateReorderListTestCases from "./Generate_Testcase/ReorderList";
import ReorderListTestCase from "../Schemas/ReorderListSchema";

// Remove Nth Node
import generateRemoveNthFromEndTestCases from "./Generate_Testcase/RemoveNthNode";
import RemoveNthNodeTestCase from "../Schemas/RemoveNthNodeSchema";

// Add Two Numbers
import generateAddTwoNumbersTestCases from "./Generate_Testcase/AddTwoNumbers";
import AddTwoNumbersTestCase from "../Schemas/AddTwoNumbersSchema";

// Find Duplicate Number
import generateFindDuplicateTestCases from "./Generate_Testcase/FindDuplicateNumber";
import FindDuplicateNumberTestCase from "../Schemas/FindDuplicateNumberSchema";

// Kth Largest Element
import generateKthLargestTestCases from "./Generate_Testcase/KthLargestElement";
import KthLargestTestCase from "../Schemas/KthLargestElementSchema";

// Word Search
import generateWordSearchTestCases from "./Generate_Testcase/WordSearch";
import WordSearchTestCase from "../Schemas/WordSearchSchema";

// Word Search 2
import generateWordSearch2TestCases from "./Generate_Testcase/WordSearch2";
import WordSearch2TestCase from "../Schemas/WordSearch2Schema";

// Climbing Stairs
import generateClimbingStairsTestCases from "./Generate_Testcase/ClimbingStairs";
import ClimbingStairsTestCase from "../Schemas/ClimbingStairsSchema";

// House Robber
import generateHouseRobberTestCases from "./Generate_Testcase/HouseRobber";
import HouseRobberTestCase from "../Schemas/HouseRobberSchema";

// House Robber 2
import generateHouseRobber2TestCases from "./Generate_Testcase/HouseRobber2";
import HouseRobber2TestCase from "../Schemas/HouseRobber2Schema";

// Longest Palindromic Substring
import generateLongestPalindromicSubstringTestCases from "./Generate_Testcase/LongestPalindromicSubstring";
import LongestPalindromicSubstringTestCase from "../Schemas/LongestPalindromicSubstringSchema";

// Paldindromic Substrings
import generatePalindromicSubstringsTestCases from "./Generate_Testcase/PalSubstrings";
import PalindromicSubstringsTestCase from "../Schemas/PalSubstringsSchema";

// Coin Change
import generateCoinChangeTestCases from "./Generate_Testcase/CoinChange";
import CoinChangeTestCase from "../Schemas/CoinChangeSchema";

// Maximum Product Subarray
import generateMaximumProductSubarrayTestCases from "./Generate_Testcase/MaxProdSubarray";
import MaximumProductSubarrayTestCase from "../Schemas/MaxProdSubarraySchema";

// Longest Increasing Subsequence
import generateLongestIncreasingSubsequenceTestCases from "./Generate_Testcase/LIS";
import LongestIncreasingSubsequenceTestCase from "../Schemas/LISSchema";

// Partition Equal Subset Sum
import generatePartitionEqualSubsetSumTestCases from "./Generate_Testcase/PartEqSubset";
import PartitionEqualSubsetSumTestCase from "../Schemas/PartEqSubsetSchema";

// Longest Common Subsequence
import generateLCSTestCases from "./Generate_Testcase/LCS";
import LongestCommonSubsequenceTestCase from "../Schemas/LCSSchema";

// Coin Change 2
import generateCoinChange2TestCases from "./Generate_Testcase/CoinChange2";
import CoinChange2TestCase from "../Schemas/CoinChange2Schema";

// Maximum Subarray
import generateMaximumSubarrayTestCases from "./Generate_Testcase/MaxSubarray";
import MaximumSubarrayTestCase from "../Schemas/MaxSubarraySchema";

// Jump Game
import generateJumpGameTestCases from "./Generate_Testcase/JumpGame";
import JumpGameTestCase from "../Schemas/JumpGameSchema";

// Jump Game 2
import generateJumpGame2TestCases from "./Generate_Testcase/JumpGame2";
import JumpGame2TestCase from "../Schemas/JumpGame2Schema";

// Number of 1 bits
import generateHammingWeightTestCases from "./Generate_Testcase/Num1bits";
import NumberOf1BitsTestCase from "../Schemas/Num1bitSchema";

// Counting Bits
import generateCountingBitsTestCases from "./Generate_Testcase/Countingbits";
import CountingBitsTestCase from "../Schemas/CountingBitsSchema";

// Reverse Bits
import generateReverseBitsTestCases from "./Generate_Testcase/ReverseBits";
import ReverseBitsTestCase from "../Schemas/ReverseBitsSchema";

// Missing Number
import generateMissingNumberTestCases from "./Generate_Testcase/MissingNumber";
import MissingNumberTestCase from "../Schemas/MissingNumberSchema";

// Network Delay Time
import generateNetworkDelayTimeTestCases from "./Generate_Testcase/NetworkDelayTime";
import NetworkDelayTimeTestCase from "../Schemas/NetworkDelayTimeSchema";

// Course Schedule
import generateCourseScheduleTestCases from "./Generate_Testcase/CourseSchedule";
import CourseScheduleTestCase from "../Schemas/CourseScheduleSchema";

// Cheapest Flight Within K Stops
import generateCheapestFlightTestCases from "./Generate_Testcase/CheapestFlight";
import CheapestFlightTestCase from "../Schemas/CheapestFlightSchema";

// Number of Islads
import generateNumberOfIslandsTestCases from "./Generate_Testcase/NumIslands";
import NumberOfIslandsTestCase from "../Schemas/NumIslandsSchema";

// Rotting Oranges
import generateRottingOrangesTestCases from "./Generate_Testcase/RottingOranges";
import RottingOrangesTestCase from "../Schemas/RottingOrangesSchema";

// Max Area of Island
import generateMaxAreaOfIslandTestCases from "./Generate_Testcase/AreaOfIsland";
import MaxAreaOfIslandTestCase from "../Schemas/AreaOfIslandSchema";


const numTestcases = parseInt(process.env.NUM_TESTCASES as string) || 10

const insertAllTestcases = async () => {
    const insertTwoSum = async () => {
        const testcases = generateTwoSumTestCases(numTestcases);
        await TwoSumTestCase.insertMany(testcases);
        // console.log("Two sum Testcases inserted successfully")
    }
    const insertLongestSubstring = async () => {
        const testcases = generateLongestSubstringTestCases(numTestcases);
        await LongestSubstringTestCase.insertMany(testcases);
        // console.log("Longest Substring Testcases inserted successfully")
    }
    const insertBestTimeStock1 = async () => {
        const testcases = generateBestTimeStock1(numTestcases)
        await BestTimeStock1TestCase.insertMany(testcases)
        // console.log("Best Time to Buy and Sell Stock - 1 Testcases inserted successfully")
    }
    const insertBestTimeStock2 = async () => {
        const testcases = generateBestTimeStock2(numTestcases)
        await BestTimeStock2TestCase.insertMany(testcases)
        // console.log("Best Time to Buy and Sell Stock - 2 Testcases inserted successfully")
    }
    const insertBestTimeStock3 = async () => {
        const testcases = generateBestTimeStock3(numTestcases)
        await BestTimeStock3TestCase.insertMany(testcases)
        // console.log("Best Time to Buy and Sell Stock - 3 Testcases inserted successfully")
    }
    const insertBestTimeStock4 = async () => {
        const testcases = generateBestTimeStock4(numTestcases)
        await BestTimeStock4TestCase.insertMany(testcases)
        // console.log("Best Time to Buy and Sell Stock - 4 Testcases inserted successfully")
    }
    const insertSudokuSovler = async () => {
        const testcases = generateSudokuSolverTestCases(numTestcases)
        await SudokuSolverTestCase.insertMany(testcases)
        // console.log("Sudoku Solver Testcases inserted successfully")
    }
    const insertMinPathSum = async () => {
        const testcases = generateMinPathSumTestCases(numTestcases )
        await MinPathSumTestCase.insertMany(testcases)
        // console.log("Minimum Path Sum Testcases inserted successfully")
    }
    const insertDungeonGame = async () => {
        const testcases = generateDungeonGameTestCases(numTestcases )
        await DungeonGameTestCase.insertMany(testcases)
        // console.log("Dungeon Game Testcases inserted successfully")
    }
    const insertLongestIncPath = async () => {
        const testcases = generateLongestIncreasingPathTestCases(numTestcases )
        await LongestIncreasingPathTestCase.insertMany(testcases)
        // console.log("Longest Increasing Path Testcases inserted successfully")
    }
    const insertValidParentheses = async () => {
        const testcases = generateValidParenthesesTestCases(numTestcases )
        await ValidParenthesesTestCase.insertMany(testcases)
        // console.log("Valid Parentheses Testcases inserted successfully")
    }
    const insertGenerateParentheses = async () => {
        const testcases = generateParenthesesTestCases(numTestcases )
        await GenerateParenthesesTestCase.insertMany(testcases)
        // console.log("Generate Parentheses Testcases inserted successfully")
    }
    const insertMedianSortedArr = async () => {
        const testcases = generateMedianOfTwoSortedArraysTestCases(numTestcases )
        await MedianOfTwoSortedArraysTestCase.insertMany(testcases)
        // console.log("Median of Two Sorted Arrays Testcases inserted successfully")
    }
    const insertMinWindowSubstring = async () => {
        const testcases = generateMinWindowSubstringTestCases(numTestcases )
        await MinWindowSubstringTestCase.insertMany(testcases)
        // console.log("Minimum Window Substring Testcases inserted successfully")
    }
    const insertSlidingWindowMax = async () => {
        const testcases = generateSlidingWindowTestCases(numTestcases )
        await SlidingWindowMaxTestCase.insertMany(testcases)
        // console.log("Sliding Window Maximum Testcases inserted successfully")
    }
    const insertLastStoneWeight = async () => {
        const testcases = generateLastStoneWeightTestCases(numTestcases )
        await LastStoneWeightTestCase.insertMany(testcases)
        // console.log("Last Stone Weight Testcases inserted successfully")
    }
    const insertReverseLinkedList = async () => {
        const testcases = generateReverseLinkedListTestCases(numTestcases )
        await ReverseLinkedListTestCase.insertMany(testcases)
        // console.log("Reverse Linked List Testcases inserted successfully")
    }
    const insertMergeLinkedList = async () => {
        const testcases = generateMergeTwoSortedLinkedListsTestCases(numTestcases )
        await MergeTwoSortedLinkedListsTestCase.insertMany(testcases)
        // console.log("Merge Two Sorted Linked Lists Testcases inserted successfully")
    }
    const insertReverseKGroup = async () => {
        const testcases = generateReverseKGroupTestCases(numTestcases )
        await ReverseKGroupTestCase.insertMany(testcases)
        // console.log("Revserse K Group Testcases inserted successfully")
    }
    const insertLinkedlistCycle = async () => {
        const testcases = generateLinkedListCycleTestCases(numTestcases )
        await LinkedListCycleTestCase.insertMany(testcases)
        // console.log("Linked List Cycle Testcases inserted successfully")
    }
    const insertReorderList = async () => {
        const testcases = generateReorderListTestCases(numTestcases )
        await ReorderListTestCase.insertMany(testcases)
        // console.log("Reorder List Testcases inserted successfully")
    }
    const insertRemoveNthNode = async () => {
        const testcases = generateRemoveNthFromEndTestCases(numTestcases )
        await RemoveNthNodeTestCase.insertMany(testcases)
        // console.log("Remove Nth Node Testcases inserted successfully")
    }
    const insertAddTwoNumbers = async () => {
        const testcases = generateAddTwoNumbersTestCases(numTestcases )
        await AddTwoNumbersTestCase.insertMany(testcases)
        // console.log("Add Two Numbers Testcases inserted successfully")
    }
    const insertFindDuplicateNumber = async () => {
        const testcases = generateFindDuplicateTestCases(numTestcases )
        await FindDuplicateNumberTestCase.insertMany(testcases)
        // console.log("Find Duplicate Number Testcases inserted successfully")
    }
    const insertKthLargestElement = async () => {
        const testcases = generateKthLargestTestCases(numTestcases )
        await KthLargestTestCase.insertMany(testcases)
        // console.log("Kth Largest Element Testcases inserted successfully")
    }
    const insertWordSearch = async () => {
        const testcases = generateWordSearchTestCases(numTestcases )
        await WordSearchTestCase.insertMany(testcases)
        // console.log("Word Search Testcases inserted successfully")
    }
    const insertWordSearch2 = async () => {
        const testcases = generateWordSearch2TestCases(numTestcases )
        await WordSearch2TestCase.insertMany(testcases)
        // console.log("Word Search 2 Testcases inserted successfully")
    }
    const insertClimbStairs = async () => {
        const testcases = generateClimbingStairsTestCases(numTestcases )
        await ClimbingStairsTestCase.insertMany(testcases)
        // console.log("Climbing Stairs Testcases inserted successfully")
    }
    const insertHouseRobber = async () => {
        const testcases = generateHouseRobberTestCases(numTestcases )
        await HouseRobberTestCase.insertMany(testcases)
        // console.log("House Robber Testcases inserted successfully")
    }
    const insertHouseRobber2 = async () => {
        const testcases = generateHouseRobber2TestCases(numTestcases )
        await HouseRobber2TestCase.insertMany(testcases)
        // console.log("House Robber 2 Testcases inserted successfully")
    }
    const insertLongestPalindromicSubstring = async () => {
        const testcases = generateLongestPalindromicSubstringTestCases(numTestcases )
        await LongestPalindromicSubstringTestCase.insertMany(testcases)
        // console.log("Longest Palindromic Substring Testcases inserted successfully")
    }
    const insertPalindromicSubstrings = async () => {
        const testcases = generatePalindromicSubstringsTestCases(numTestcases )
        await PalindromicSubstringsTestCase.insertMany(testcases)
        // console.log("Palindromic Substrings Testcases inserted successfully")
    }
    const insertCoinChange = async () => {
        const testcases = generateCoinChangeTestCases(numTestcases )
        await CoinChangeTestCase.insertMany(testcases)
        // console.log("Coin Change Testcases inserted successfully")
    }
    const insertMaxProdSubarray = async () => {
        const testcases = generateMaximumProductSubarrayTestCases(numTestcases )
        await MaximumProductSubarrayTestCase.insertMany(testcases)
        // console.log("Maximum Product Subarray Testcases inserted successfully")
    }
    const insertLIS = async () => {
        const testcases = generateLongestIncreasingSubsequenceTestCases(numTestcases )
        await LongestIncreasingSubsequenceTestCase.insertMany(testcases)
        // console.log("Longest Increasing Subsequence Testcases inserted successfully")
    }
    const insertPartEqSubset = async () => {
        const testcases = generatePartitionEqualSubsetSumTestCases(numTestcases )
        await PartitionEqualSubsetSumTestCase.insertMany(testcases)
        // console.log("Partition Equal Subset Sum Testcases inserted successfully")
    }
    const insertLCS = async () => {
        const testcases = generateLCSTestCases(numTestcases )
        await LongestCommonSubsequenceTestCase.insertMany(testcases)
        // console.log("Longest Common Subsequence Testcases inserted successfully")
    }
    const insertCoinChange2 = async () => {
        const testcases = generateCoinChange2TestCases(numTestcases )
        await CoinChange2TestCase.insertMany(testcases)
        // console.log("Coin Change 2 Testcases inserted successfully")
    }
    const insertMaxSubarray = async () => {
        const testcases = generateMaximumSubarrayTestCases(numTestcases )
        await MaximumSubarrayTestCase.insertMany(testcases)
        // console.log("Maximum Subarray Testcases inserted successfully")
    }
    const insertJumpGame = async () => {
        const testcases = generateJumpGameTestCases(numTestcases )
        await JumpGameTestCase.insertMany(testcases)
        // console.log("Jump Game Testcases inserted successfully")
    }
    const insertJumpGame2 = async () => {
        const testcases = generateJumpGame2TestCases(numTestcases )
        await JumpGame2TestCase.insertMany(testcases)
        // console.log("Jump Game 2 Testcases inserted successfully")
    }
    const insertHammingWeight = async () => {
        const testcases = generateHammingWeightTestCases(numTestcases )
        await NumberOf1BitsTestCase.insertMany(testcases)
        // console.log("Number of 1 bits Testcases inserted successfully")
    }
    const insertCountingBits = async () => {
        const testcases = generateCountingBitsTestCases(numTestcases )
        await CountingBitsTestCase.insertMany(testcases)
        // console.log("Counting Bits Testcases inserted successfully")
    }
    const insertReverseBits = async () => {
        const testcases = generateReverseBitsTestCases(numTestcases )
        await ReverseBitsTestCase.insertMany(testcases)
        // console.log("Reverse Bits Testcases inserted successfully")
    }
    const insertMissingNumber = async () => {
        const testcases = generateMissingNumberTestCases(numTestcases )
        await MissingNumberTestCase.insertMany(testcases)
        // console.log("Missing Number Testcases inserted successfully")
    }
    const insertNetworkDelayTime = async () => {
        const testcases = generateNetworkDelayTimeTestCases(numTestcases )
        await NetworkDelayTimeTestCase.insertMany(testcases)
        // console.log("Network Delay Time Testcases inserted successfully")
    }
    const insertCourseSchedule = async () => {
        const testcases = generateCourseScheduleTestCases(numTestcases )
        await CourseScheduleTestCase.insertMany(testcases)
        // console.log("Course Schedule Testcases inserted successfully")
    }
    const insertCheapestFlight = async () => {
        const testcases = generateCheapestFlightTestCases(numTestcases )
        await CheapestFlightTestCase.insertMany(testcases)
        // console.log("Cheapest Flight Within K Stops Testcases inserted successfully")
    }
    const insertNumOfIslands = async () => {
        const testcases = generateNumberOfIslandsTestCases(numTestcases )
        await NumberOfIslandsTestCase.insertMany(testcases)
        // console.log("Number of Islands Testcases inserted successfully")
    }
    const insertRottingOranges = async () => {
        const testcases = generateRottingOrangesTestCases(numTestcases )
        await RottingOrangesTestCase.insertMany(testcases)
        // console.log("Rotting Oranges Testcases inserted successfully")
    }
    const insertAreaofIsland = async () => {
        const testcases = generateMaxAreaOfIslandTestCases(numTestcases )
        await MaxAreaOfIslandTestCase.insertMany(testcases)
        // console.log("Max Area of Island Testcases inserted successfully")
    }
    try {
        await connectDB();
        await Promise.all([insertTwoSum(), insertLongestSubstring(),
        insertBestTimeStock1(), insertBestTimeStock2(), insertBestTimeStock3(), insertBestTimeStock4(), insertSudokuSovler(), insertMinPathSum(), insertDungeonGame()
            , insertLongestIncPath(), insertValidParentheses(), insertGenerateParentheses(), insertMedianSortedArr(), insertMinWindowSubstring(),
            insertSlidingWindowMax(), insertLastStoneWeight(), insertReverseLinkedList(), insertMergeLinkedList(), insertReverseKGroup(), insertLinkedlistCycle(),
            insertReorderList(), insertRemoveNthNode(), insertAddTwoNumbers(), insertFindDuplicateNumber(), insertKthLargestElement(), insertWordSearch(),
            insertWordSearch2(), insertClimbStairs(), insertHouseRobber(), insertHouseRobber2(), insertLongestPalindromicSubstring(), insertPalindromicSubstrings(),
            insertCoinChange(), insertMaxProdSubarray(), insertLIS(), insertPartEqSubset(), insertLCS(), insertCoinChange2(), insertMaxSubarray(), insertJumpGame(),
            insertJumpGame2(), insertHammingWeight(), insertCountingBits(), insertReverseBits(), insertMissingNumber(), insertNetworkDelayTime(), insertCourseSchedule(),
            insertCheapestFlight(), insertNumOfIslands(), insertRottingOranges(), insertAreaofIsland()
        ])
    } catch (exception) {
        // console.log("Error in inserting testcases: ", exception)
    } finally {
        connection.close()
    }
}

insertAllTestcases()