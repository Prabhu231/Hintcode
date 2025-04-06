const lengthOfLIS = (nums: number[]): number => {
    const dp: number[] = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp, 0);
};

const generateLongestIncreasingSubsequenceTestCases = (count: number) => {
    const testCases = [];

    const generateRandomArray = (size: number, min: number, max: number): number[] => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    };

    for (let i = 0; i < count; i++) {
        let size = Math.floor(Math.random() * 8) + 3; // Length between 3 and 10
        let nums = generateRandomArray(size, -100, 100);
        let expected_output = lengthOfLIS(nums);

        testCases.push({
            problemName: "Longest Increasing Subsequence",
            input: { nums },
            expected_output,
        });
    }

    return testCases;
};

export default generateLongestIncreasingSubsequenceTestCases;
