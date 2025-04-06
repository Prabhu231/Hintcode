const maxProfit2 = function(prices: number[]) {
    var [curr, next, diff, sum] = [0,0,0,0];
    for ( var i = 0; i<prices.length-1; i++ ) {
        curr = prices[i];
        next = prices[i+1];
        diff = next-curr;
        if ( diff > 0 ) {
            sum+=diff;
        }
    }
    
    return sum;
};

const generateBestTimeStock2 = (count: number) => {
    const testCases = [];
    for (let i = 0; i < count; i++) {
        let prices = Array.from({ length: Math.floor(Math.random() * 10) + 2 }, () =>
            Math.floor(Math.random() * 100)
        );
        const expected_output = maxProfit2(prices);
        testCases.push({
            problemName: "Best Time to Buy and Sell Stock 2",
            input: { prices },
            expected_output,
        });
    }
    return testCases;
};

export default generateBestTimeStock2;
