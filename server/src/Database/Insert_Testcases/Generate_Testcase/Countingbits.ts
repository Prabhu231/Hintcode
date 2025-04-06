const countBits = (n: number): number[] => {
    const ans: number[] = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1] + (i & 1); // DP approach: countBits(i) = countBits(i / 2) + (i % 2)
    }
    return ans;
};

const generateCountingBitsTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let n = Math.floor(Math.random() * 100) + 1; // Random n between 1 and 100
        let expected_output = countBits(n); 

        testCases.push({
            problemName: "Counting Bits",
            input: { n },
            expected_output,
        });
    }

    return testCases;
};

export default generateCountingBitsTestCases;
