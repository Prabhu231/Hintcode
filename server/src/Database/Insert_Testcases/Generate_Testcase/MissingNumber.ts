const missingNumber = (nums: number[]): number => {
    const n = nums.length;
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = nums.reduce((sum, num) => sum + num, 0);
    return expectedSum - actualSum;
};

const generateMissingNumberTestCases = (count: number) => {
    const testCases = [];
    const maxArraySize = 15; 

    for (let i = 0; i < count; i++) {
        let size = Math.floor(Math.random() * (maxArraySize - 4)) + 5; 
        let fullArray = Array.from({ length: size }, (_, index) => index);
        let missingIndex = Math.floor(Math.random() * size); 
        let nums = [...fullArray.slice(0, missingIndex), ...fullArray.slice(missingIndex + 1)]; 

        let expected_output = missingNumber(nums);

        testCases.push({
            problemName: "Missing Number",
            input: { nums },
            expected_output,
        });
    }

    return testCases;
};

export default generateMissingNumberTestCases;
