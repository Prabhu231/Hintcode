const longestIncreasingPath = function(matrix: number[][]): number {
    if (!matrix.length || !matrix[0].length) return 0;
    const rows = matrix.length, cols = matrix[0].length;
    const memo: number[][] = Array.from({ length: rows }, () => Array(cols).fill(0));
    
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    
    const dfs = (r: number, c: number, prevValue: number): number => {
        if (r < 0 || c < 0 || r >= rows || c >= cols || matrix[r][c] <= prevValue) return 0;
        if (memo[r][c]) return memo[r][c];
        
        let maxPath = 0;
        for (const [dr, dc] of directions) {
            maxPath = Math.max(maxPath, dfs(r + dr, c + dc, matrix[r][c]));
        }
        memo[r][c] = maxPath + 1;
        return memo[r][c];
    };
    
    let longestPath = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            longestPath = Math.max(longestPath, dfs(r, c, -1));
        }
    }
    return longestPath;
};

const generateLongestIncreasingPathTestCases = (count: number) => {
    const testCases = [];
    
    for (let i = 0; i < count; i++) {
        let rows, cols;
        
        // Ensure at least 1 row and 1 column
        do {
            rows = Math.floor(Math.random() * 5) + 2;
            cols = Math.floor(Math.random() * 5) + 2;
        } while (rows === 0 || cols === 0);
        
        const matrix = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
        );
        
        let expected_output = longestIncreasingPath(matrix);
        
        testCases.push({
            problemName: "Longest Increasing Path in a Matrix",
            input: { matrix },
            expected_output,
        });
    }
    return testCases;
};

export default generateLongestIncreasingPathTestCases;
