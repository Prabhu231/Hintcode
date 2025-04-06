const coinChange2 = (coins: number[], amount: number): number => {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1; // One way to make 0 amount (using no coins)

    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }

    return dp[amount];
};

const generateCoinChange2TestCases = (count: number) => {
    const testCases = [];

    const generateRandomCoins = (): number[] => {
        const numCoins = Math.floor(Math.random() * 5) + 1; // Between 1 to 5 coins
        const coins = new Set<number>();

        while (coins.size < numCoins) {
            coins.add(Math.floor(Math.random() * 10) + 1); // Coin values between 1 and 10
        }

        return Array.from(coins);
    };

    for (let i = 0; i < count; i++) {
        const coins = generateRandomCoins();
        const amount = Math.floor(Math.random() * 50) + 1; // Amount between 1 and 50
        const expected_output = coinChange2(coins, amount);

        testCases.push({
            problemName: "Coin Change 2",
            input: { coins, amount },
            expected_output,
        });
    }

    return testCases;
};

export default generateCoinChange2TestCases;
