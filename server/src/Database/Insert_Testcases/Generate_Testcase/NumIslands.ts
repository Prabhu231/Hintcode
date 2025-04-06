const generateNumberOfIslandsTestCases = (count: number) => {
    const testCases = [];

    const generateGrid = (rows: number, cols: number, islandDensity: number): string[][] => {
        const grid: string[][] = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => (Math.random() < islandDensity ? "1" : "0"))
        );
        return grid;
    };

    const countIslands = (grid: string[][]): number => {
        const rows = grid.length, cols = grid[0].length;
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
        
        const directions = [
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        const dfs = (r: number, c: number) => {
            if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === "0" || visited[r][c]) return;
            visited[r][c] = true;
            for (const [dr, dc] of directions) {
                dfs(r + dr, c + dc);
            }
        };

        let islandCount = 0;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === "1" && !visited[r][c]) {
                    islandCount++;
                    dfs(r, c);
                }
            }
        }
        return islandCount;
    };

    for (let i = 0; i < count; i++) {
        const rows = Math.floor(Math.random() * 5) + 3;  // Random size 3-7
        const cols = Math.floor(Math.random() * 5) + 3;
        const density = Math.random() * 0.6 + 0.2; // Ensuring a mix of land and water
        const grid = generateGrid(rows, cols, density);
        const expected_output = countIslands(grid);

        testCases.push({
            problemName: "Number of Islands",
            input: { grid },
            expected_output,
        });
    }

    return testCases;
};

export default generateNumberOfIslandsTestCases;
