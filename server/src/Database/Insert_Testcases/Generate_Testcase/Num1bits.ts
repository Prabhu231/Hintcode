const hammingWeight = (n: number): number => {
    let count = 0;
    while (n > 0) {
        count += n & 1; 
        n >>= 1; 
    }
    return count;
};

const generateHammingWeightTestCases = (count: number) => {
    const testCases = [];

    const predefinedTestCases = [
        { n: 0, expected_output: 0 }, // No set bits
        { n: 1, expected_output: 1 }, // Single bit
        { n: 2, expected_output: 1 }, // Binary: 10
        { n: 3, expected_output: 2 }, // Binary: 11
        { n: 4, expected_output: 1 }, // Binary: 100
        { n: 7, expected_output: 3 }, // Binary: 111
        { n: 15, expected_output: 4 }, // Binary: 1111
        { n: 16, expected_output: 1 }, // Binary: 10000
        { n: 31, expected_output: 5 }, // Binary: 11111
        { n: 255, expected_output: 8 }, // Binary: 11111111
        { n: 1023, expected_output: 10 }, // Binary: 1111111111
    ];

    for (const testCase of predefinedTestCases) {
        testCases.push({
            problemName: "Number of 1 Bits",
            input: { n: testCase.n },
            expected_output: testCase.expected_output,
        });
    }

    for (let i = 0; i < count - predefinedTestCases.length; i++) {
        let n = Math.floor(Math.random() * (1 << 20)); // Random number up to ~1 million
        let expected_output = hammingWeight(n);

        testCases.push({
            problemName: "Number of 1 Bits",
            input: { n },
            expected_output,
        });
    }

    return testCases;
};

export default generateHammingWeightTestCases;
