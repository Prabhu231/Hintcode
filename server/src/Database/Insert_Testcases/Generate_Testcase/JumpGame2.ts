const jump = (nums: number[]): number => {
    let jumps = 0, farthest = 0, end = 0;
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === end) {
            jumps++;
            end = farthest;
        }
    }
    return jumps;
};

const generateJumpGame2TestCases = (count: number) => {
    const testCases = [];

    const generateValidArray = (length: number): number[] => {
        let nums = new Array(length).fill(1);

        for (let i = 0; i < length - 1; i++) {
            nums[i] = Math.floor(Math.random() * (length - i)) + 1;
        }

        return nums;
    };

    for (let i = 0; i < count; i++) {
        let length = Math.floor(Math.random() * 10) + 5; 
        let nums = generateValidArray(length);
        let expected_output = jump(nums);

        testCases.push({
            problemName: "Jump Game II",
            input: { nums },
            expected_output,
        });
    }

    return testCases;
};

export default generateJumpGame2TestCases;
