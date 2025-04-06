const maxSubArray = function(nums: number[]): number {
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }

    return maxSum;
};

const generateMaximumSubarrayTestCases = (count: number) => {
    const testCases = [];


    const generateRandomArray = (size: number, maxValue: number): number[] => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * (2 * maxValue + 1)) - maxValue); // Array values between -maxValue and +maxValue
    };

    for (let i = 0; i < count; i++) {
        let size = Math.floor(Math.random() * 5) + 2; 
        let nums = generateRandomArray(size, 10); 
        let expected_output = maxSubArray(nums); 

        testCases.push({
            problemName: "Maximum Subarray",
            input: { nums },
            expected_output,
        });
    }

    return testCases;
};

export default generateMaximumSubarrayTestCases;
