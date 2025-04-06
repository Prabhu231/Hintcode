import { Model } from "mongoose";

interface IProblemDetails {
    [key: string]: Model<any>;
}


import TwoSumTestCase from "./Schemas/TwoSumSchema"
import LongestSubstringTestCase from "./Schemas/LongestSubstringSchema";
import BestTimeStock1TestCase from "./Schemas/BestTimeStock_1Schema";
import BestTimeStock2TestCase from "./Schemas/BestTimeStock_2Schema";
import BestTimeStock3TestCase from "./Schemas/BestTimeStock_3Schema";
import BestTimeStock4TestCase from "./Schemas/BestTimeStock_4Schema";
import SudokuSolverTestCase from "./Schemas/SudokuSolverSchema";
import MinPathSumTestCase from "./Schemas/MinPathSumSchema";
import DungeonGameTestCase from "./Schemas/DungeonGameSchema";
import LongestIncreasingPathTestCase from "./Schemas/LongestIncPathSchema";
import ValidParenthesesTestCase from "./Schemas/ValidParenthesesSchema";
import GenerateParenthesesTestCase from "./Schemas/GenerateParenthesesSchema";
import MedianOfTwoSortedArraysTestCase from "./Schemas/MedianSortedArrSchema";
import MinWindowSubstringTestCase from "./Schemas/MinWindowSubstringSchema";
import SlidingWindowMaxTestCase from "./Schemas/SlidingWindowMaxSchema";
import LastStoneWeightTestCase from "./Schemas/LastStoneWeightSchema";
import ReverseLinkedListTestCase from "./Schemas/ReverseLinkedListSchema";
import MergeTwoSortedLinkedListsTestCase from "./Schemas/MergeTwoLinkedListsSchema";
import ReverseKGroupTestCase from "./Schemas/ReverseKGroupSchema";
import LinkedListCycleTestCase from "./Schemas/LinkedlistCycleSchema";
import ReorderListTestCase from "./Schemas/ReorderListSchema";
import RemoveNthNodeTestCase from "./Schemas/RemoveNthNodeSchema";
import AddTwoNumbersTestCase from "./Schemas/AddTwoNumbersSchema";
import FindDuplicateNumberTestCase from "./Schemas/FindDuplicateNumberSchema";
import KthLargestTestCase from "./Schemas/KthLargestElementSchema";
import WordSearchTestCase from "./Schemas/WordSearchSchema";
import WordSearch2TestCase from "./Schemas/WordSearch2Schema";
import ClimbingStairsTestCase from "./Schemas/ClimbingStairsSchema";
import HouseRobberTestCase from "./Schemas/HouseRobberSchema";
import HouseRobber2TestCase from "./Schemas/HouseRobber2Schema";
import LongestPalindromicSubstringTestCase from "./Schemas/LongestPalindromicSubstringSchema";
import PalindromicSubstringsTestCase from "./Schemas/PalSubstringsSchema";
import CoinChangeTestCase from "./Schemas/CoinChangeSchema";
import MaximumProductSubarrayTestCase from "./Schemas/MaxProdSubarraySchema";
import LongestIncreasingSubsequenceTestCase from "./Schemas/LISSchema";
import PartitionEqualSubsetSumTestCase from "./Schemas/PartEqSubsetSchema";
import LongestCommonSubsequenceTestCase from "./Schemas/LCSSchema";
import CoinChange2TestCase from "./Schemas/CoinChange2Schema";
import MaximumSubarrayTestCase from "./Schemas/MaxSubarraySchema";
import JumpGameTestCase from "./Schemas/JumpGameSchema";
import JumpGame2TestCase from "./Schemas/JumpGame2Schema";
import NumberOf1BitsTestCase from "./Schemas/Num1bitSchema";
import CountingBitsTestCase from "./Schemas/CountingBitsSchema";
import ReverseBitsTestCase from "./Schemas/ReverseBitsSchema";
import MissingNumberTestCase from "./Schemas/MissingNumberSchema";
import NetworkDelayTimeTestCase from "./Schemas/NetworkDelayTimeSchema";
import CourseScheduleTestCase from "./Schemas/CourseScheduleSchema";
import CheapestFlightTestCase from "./Schemas/CheapestFlightSchema";
import NumberOfIslandsTestCase from "./Schemas/NumIslandsSchema";
import RottingOrangesTestCase from "./Schemas/RottingOrangesSchema";
import MaxAreaOfIslandTestCase from "./Schemas/AreaOfIslandSchema";


export const details: IProblemDetails = {
    '1': TwoSumTestCase,
    '2': LongestSubstringTestCase,
    '3': BestTimeStock1TestCase,
    '4': BestTimeStock2TestCase,
    '5': BestTimeStock3TestCase,
    '6': BestTimeStock4TestCase,
    '7': SudokuSolverTestCase,
    '8': MinPathSumTestCase,
    '9': DungeonGameTestCase,
    '10': LongestIncreasingPathTestCase,
    '11': ValidParenthesesTestCase,
    '12': GenerateParenthesesTestCase,
    '13': MedianOfTwoSortedArraysTestCase,
    '14': MinWindowSubstringTestCase,
    '15': SlidingWindowMaxTestCase,
    '16': LastStoneWeightTestCase,
    '17': ReverseLinkedListTestCase,
    '18': MergeTwoSortedLinkedListsTestCase,
    '19': ReverseKGroupTestCase,
    '20': LinkedListCycleTestCase,
    '21': ReorderListTestCase,
    '22': RemoveNthNodeTestCase,
    '23': AddTwoNumbersTestCase,
    '24': FindDuplicateNumberTestCase,
    '25': KthLargestTestCase,
    '26': WordSearchTestCase,
    '27': WordSearch2TestCase,
    '28': ClimbingStairsTestCase,
    '29': HouseRobberTestCase,
    '30': HouseRobber2TestCase,
    '31': LongestPalindromicSubstringTestCase,
    '32': PalindromicSubstringsTestCase,
    '33': CoinChangeTestCase,
    '34': MaximumProductSubarrayTestCase,
    '35': LongestIncreasingSubsequenceTestCase,
    '36': PartitionEqualSubsetSumTestCase,
    '37': LongestCommonSubsequenceTestCase,
    '38': CoinChange2TestCase,
    '39': MaximumSubarrayTestCase,
    '40': JumpGameTestCase,
    '41': JumpGame2TestCase,
    '42': NumberOf1BitsTestCase,
    '43': CountingBitsTestCase,
    '44': ReverseBitsTestCase,
    '45': MissingNumberTestCase,
    '46': NetworkDelayTimeTestCase,
    '47': CourseScheduleTestCase,
    '48': CheapestFlightTestCase,
    '49': NumberOfIslandsTestCase,
    '50': RottingOrangesTestCase,
    '51': MaxAreaOfIslandTestCase
}