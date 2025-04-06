const rob = (nums: number[]): number => {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = 0, prev1 = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let temp = prev1;
        prev1 = Math.max(prev1, prev2 + nums[i]);
        prev2 = temp;
    }

    return prev1;
};

const generateHouseRobberTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let length = Math.floor(Math.random() * 10) + 5; 
        let nums = Array.from({ length }, () => Math.floor(Math.random() * 50) + 1);

        let expected_output = rob(nums);

        testCases.push({
            problemName: "House Robber",
            input: { nums },
            expected_output,
        });
    }

    return testCases;
};

export default generateHouseRobberTestCases;
