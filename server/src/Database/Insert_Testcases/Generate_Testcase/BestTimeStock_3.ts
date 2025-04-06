const maxProfit3 = function(prices: number[]) {
    const n = prices.length;
    if (n === 0) return 0;

    let dp1 = new Array(n).fill(0);
    let dp2 = new Array(n).fill(0);

    let minPrice1 = prices[0];
    let minPrice2 = prices[0];

    for (let i = 1; i < n; i++) {
        minPrice1 = Math.min(minPrice1, prices[i]);
        dp1[i] = Math.max(dp1[i - 1], prices[i] - minPrice1);
    }

    for (let i = 1; i < n; i++) {
        minPrice2 = Math.min(minPrice2, prices[i] - dp1[i - 1]); // Max profit up to day i-1
        dp2[i] = Math.max(dp2[i - 1], prices[i] - minPrice2);
    }

    return dp2[n - 1];
};

const generateBestTimeStock3 = (count: number) => {
    const testCases = [];
    for (let i = 0; i < count; i++) {
        let prices = Array.from({ length: Math.floor(Math.random() * 10) + 2 }, () =>
            Math.floor(Math.random() * 100)
        );
        const expected_output = maxProfit3(prices);
        testCases.push({
            problemName: "Best Time to Buy and Sell Stock 3",
            input: { prices },
            expected_output,
        });
    }
    return testCases;
};

export default generateBestTimeStock3;
