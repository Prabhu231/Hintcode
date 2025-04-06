const minPathSum = function(grid: number[][]) {
    const m = grid.length;
    const n = grid[0].length;
    
    for (let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0];
    }
    for (let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1];
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    
    return grid[m - 1][n - 1];
};

const generateMinPathSumTestCases = (count: number) => {
    const testCases = [];
    
    for (let i = 0; i < count; i++) {
        const rows = Math.floor(Math.random() * 5) + 3;
        const cols = Math.floor(Math.random() * 5) + 3;
        const grid = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => Math.floor(Math.random() * 10) + 1)
        );
        
        let expected_output = minPathSum(JSON.parse(JSON.stringify(grid))); // Deep copy
        
        testCases.push({
            problemName: "Minimum Path Sum",
            input: { grid },
            expected_output,
        });
    }
    return testCases;
};

export default generateMinPathSumTestCases;
