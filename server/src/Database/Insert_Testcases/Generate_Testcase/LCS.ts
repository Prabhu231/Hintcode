
const longestCommonSubsequence = (text1: string, text2: string): number => {
    const m = text1.length, n = text2.length;
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
};


const generateLCSStrings = (length: number): { text1: string; text2: string } => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    
    
    const text1 = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    const text2 = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    return { text1, text2 };
};


const generateLCSTestCases = (count: number): { problemName: string; input: { text1: string; text2: string }; expected_output: number }[] => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        const length = Math.floor(Math.random() * 6) + 3; 
        const { text1, text2 } = generateLCSStrings(length);
        const expected_output = longestCommonSubsequence(text1, text2);

        testCases.push({
            problemName: "Longest Common Subsequence",
            input: { text1, text2 },
            expected_output,
        });
    }

    return testCases;
};

export default generateLCSTestCases;
