const rob2 = (nums: number[]): number => {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    const robLinear = (arr: number[]): number => {
        let prev2 = 0, prev1 = arr[0];

        for (let i = 1; i < arr.length; i++) {
            let temp = prev1;
            prev1 = Math.max(prev1, prev2 + arr[i]);
            prev2 = temp;
        }

        return prev1;
    };

    return Math.max(robLinear(nums.slice(1)), robLinear(nums.slice(0, -1)));
};

const generateHouseRobber2TestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let length = Math.floor(Math.random() * 10) + 5; 
        let nums = Array.from({ length }, () => Math.floor(Math.random() * 50) + 1); 

        let expected_output = rob2(nums); 

        testCases.push({
            problemName: "House Robber 2",
            input: { nums },
            expected_output,
        });
    }

    return testCases;
};

export default generateHouseRobber2TestCases;
