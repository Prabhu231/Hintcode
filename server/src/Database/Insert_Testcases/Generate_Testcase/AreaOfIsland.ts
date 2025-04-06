const directions = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ];
  
  const bfsMaxArea = (grid: number[][]): number => {
    const visited = Array.from({ length: grid.length }, () => Array(grid[0].length).fill(false));
    let maxArea = 0;
  
    const isValid = (x: number, y: number) => (
      x >= 0 && y >= 0 && x < grid.length && y < grid[0].length &&
      grid[x][y] === 1 && !visited[x][y]
    );
  
    const bfs = (x: number, y: number): number => {
      let queue: [number, number][] = [[x, y]];
      visited[x][y] = true;
      let area = 1;
  
      while (queue.length) {
        const [cx, cy] = queue.shift()!;
        for (const [dx, dy] of directions) {
          const nx = cx + dx, ny = cy + dy;
          if (isValid(nx, ny)) {
            visited[nx][ny] = true;
            queue.push([nx, ny]);
            area++;
          }
        }
      }
      return area;
    };
  
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 1 && !visited[i][j]) {
          maxArea = Math.max(maxArea, bfs(i, j));
        }
      }
    }
  
    return maxArea;
  };
  
  const generateRandomGrid = (rows: number, cols: number): number[][] => {
    const grid: number[][] = [];
    for (let i = 0; i < rows; i++) {
      const row: number[] = [];
      for (let j = 0; j < cols; j++) {
        row.push(Math.random() < 0.3 ? 1 : 0); // 30% chance of land
      }
      grid.push(row);
    }
    return grid;
  };
  
  const generateMaxAreaOfIslandTestCases = (count: number) => {
    const testCases = [];
  
    for (let i = 0; i < count; i++) {
      const rows = Math.floor(Math.random() * 5) + 3; // 3 to 7 rows
      const cols = Math.floor(Math.random() * 5) + 3; // 3 to 7 cols
  
      const grid = generateRandomGrid(rows, cols);
      const expected_output = bfsMaxArea(grid);
  
      testCases.push({
        problemName: "Max Area of Island",
        input: { grid },
        expected_output
      });
    }
  
    return testCases;
  };
  
  export default generateMaxAreaOfIslandTestCases;
  