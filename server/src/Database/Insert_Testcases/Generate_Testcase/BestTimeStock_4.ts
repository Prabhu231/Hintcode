const maxProfit4 = function (k: number, prices: number[]) {
    const n = prices.length;
    if (n === 0) return 0;

    let dp = new Array(k + 1).fill(0).map(() => new Array(n).fill(0));

    for (let t = 1; t <= k; t++) {
        let maxDiff = -prices[0]; // maxDiff stores the max of dp[t-1][j] - prices[j]

        for (let i = 1; i < n; i++) {
            dp[t][i] = Math.max(dp[t][i - 1], prices[i] + maxDiff);
            maxDiff = Math.max(maxDiff, dp[t - 1][i] - prices[i]);
        }
    }

    return dp[k][n - 1];
};

const generateBestTimeStock4 = (count: number) => {
    const testCases = [];
    for (let i = 0; i < count; i++) {
        let prices = Array.from({ length: Math.floor(Math.random() * 10) + 2 }, () =>
            Math.floor(Math.random() * 100)
        );
        let k = Math.floor(Math.random() * 5) + 1; 

        const expected_output = maxProfit4(k, prices);

        testCases.push({
            problemName: "Best Time to Buy and Sell Stock 4",
            input: { prices, k },
            expected_output,
        });
    }
    return testCases;
};

export default generateBestTimeStock4;
