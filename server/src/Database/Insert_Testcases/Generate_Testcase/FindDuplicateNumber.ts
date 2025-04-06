const generateFindDuplicateTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let n = Math.floor(Math.random() * 6) + 3; 
        let nums = Array.from({ length: n }, (_, idx) => idx + 1); 
        let duplicate = nums[Math.floor(Math.random() * n)]; 
        nums.push(duplicate); // Add duplicate
        nums = nums.sort(() => Math.random() - 0.5);

        testCases.push({
            problemName: "Find the Duplicate Number",
            input: { nums },
            expected_output: duplicate,
        });
    }

    return testCases;
};

export default generateFindDuplicateTestCases;
