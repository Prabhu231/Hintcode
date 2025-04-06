const calculateMinimumHP = (dungeon: number[][]): number => {
    const m = dungeon.length;
    const n = dungeon[0].length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(Infinity));

    dp[m][n - 1] = dp[m - 1][n] = 1;

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const need = Math.min(dp[i + 1][j], dp[i][j + 1]) - dungeon[i][j];
            dp[i][j] = need <= 0 ? 1 : need;
        }
    }
    return dp[0][0];
};

const generateDungeonGameTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        const rows = Math.floor(Math.random() * 5) + 2; // Random rows (2-6)
        const cols = Math.floor(Math.random() * 5) + 2; // Random cols (2-6)

        let dungeon = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => Math.floor(Math.random() * 21) - 10) // Values between -10 to 10
        );

        let expected_output = calculateMinimumHP(dungeon);

        testCases.push({
            problemName: "Dungeon Game",
            input: { dungeon },
            expected_output,
        });
    }
    
    return testCases;
};

export default generateDungeonGameTestCases;
