const maxProfit = function(prices: number[]) {
    if (prices.length === 0) {
        return 0;
    }
    
    let maxProfit = 0;
    let minPrice = prices[0];

    for (let price of prices) {
        minPrice = Math.min(minPrice, price);
        const profit = price - minPrice;
        maxProfit = Math.max(profit, maxProfit);
    }

    return maxProfit;
};

const generateBestTimeStock1 = (count: number) => {
    const testCases = [];
    for (let i = 0; i < count; i++) {
        let prices = Array.from({ length: Math.floor(Math.random() * 10) + 2 }, () =>
            Math.floor(Math.random() * 100)
        );
        const expected_output = maxProfit(prices);
        testCases.push({
            problemName: "Best Time to Buy and Sell Stock 1",
            input: { prices },
            expected_output,
        });
    }
    return testCases;
};

export default generateBestTimeStock1;
