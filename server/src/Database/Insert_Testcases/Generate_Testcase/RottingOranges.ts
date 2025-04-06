type Grid = number[][];

const orangesRotting = (grid: Grid): number => {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue: [number, number][] = [];
  let fresh = 0;

  // Initialize queue with rotten oranges and count fresh
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }

  let minutes = 0;
  const directions = [[1,0], [-1,0], [0,1], [0,-1]];

  while (queue.length && fresh > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift()!;
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 && nr < rows && nc >= 0 && nc < cols &&
          grid[nr][nc] === 1
        ) {
          grid[nr][nc] = 2;
          queue.push([nr, nc]);
          fresh--;
        }
      }
    }
    minutes++;
  }

  return fresh === 0 ? minutes : -1;
};

const generateGrid = (rows: number, cols: number): Grid => {
  const grid: Grid = [];
  const options = [0, 1, 2];

  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < cols; j++) {
      const val = options[Math.floor(Math.random() * options.length)];
      row.push(val);
    }
    grid.push(row);
  }

  return grid;
};

const deepCopyGrid = (grid: Grid): Grid => grid.map(row => [...row]);

const generateRottingOrangesTestCases = (count: number) => {
  const testCases = [];

  for (let i = 0; i < count; i++) {
    const rows = Math.floor(Math.random() * 3) + 2; // 2 to 4 rows
    const cols = Math.floor(Math.random() * 3) + 2; // 2 to 4 cols

    const grid = generateGrid(rows, cols);
    const expected_output = orangesRotting(deepCopyGrid(grid)); // copy to avoid mutation

    testCases.push({
      problemName: "Rotting Oranges",
      input: { grid },
      expected_output,
    });
  }

  return testCases;
};

export default generateRottingOrangesTestCases;
