const reverseBits = (n: number): number => {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>>= 1;
    }
    return result >>> 0; // Ensure it's an unsigned 32-bit integer
};

const generateReverseBitsTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let n = Math.floor(Math.random() * 4294967296); // Random 32-bit unsigned integer
        let expected_output = reverseBits(n);

        testCases.push({
            problemName: "Reverse Bits",
            input: { n },
            expected_output,
        });
    }

    return testCases;
};

export default generateReverseBitsTestCases;
