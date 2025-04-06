const canJump = function(nums: number[]): boolean {
    let maxJump = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i > maxJump) return false; 
        maxJump = Math.max(maxJump, i + nums[i]); 
    }
    return true;
};

const generateJumpGameTestCases = (count: number) => {
    const testCases = [];

    // Generate random test case
    for (let i = 0; i < count; i++) {
        const length = Math.floor(Math.random() * 10) + 5; 
        const nums: number[] = [];
        for (let j = 0; j < length; j++) {
            nums.push(Math.floor(Math.random() * 10)); 
        }

        let expected_output = canJump(nums); 

        testCases.push({
            problemName: "Jump Game",
            input: { nums },
            expected_output: expected_output,
        });
    }

    return testCases;
};

export default generateJumpGameTestCases;
