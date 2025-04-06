const solveSudoku = (board: string[][]): string[][] => {
    const isValid = (row: number, col: number, num: string): boolean => {
      for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;
      }
      
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[startRow + i][startCol + j] === num) return false;
        }
      }
      
      return true;
    };
  
    const backtrack = (row: number, col: number): boolean => {
      if (row === 9) return true;
      if (col === 9) return backtrack(row + 1, 0);
      if (board[row][col] !== ".") return backtrack(row, col + 1);
  
      for (let num = 1; num <= 9; num++) {
        const numStr = num.toString();
        if (isValid(row, col, numStr)) {
          board[row][col] = numStr;
          if (backtrack(row, col + 1)) return true;
          board[row][col] = ".";
        }
      }
      return false;
    };
  
    backtrack(0, 0);
    return board;
  };
  
  const generateSudokuSolverTestCases = (count: number) => {
    const testCases = [];
  
    for (let i = 0; i < count; i++) {
      // Generate a valid Sudoku board with some cells removed
      const solvedBoard = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
      ];
  
      const expected_output = solveSudoku(JSON.parse(JSON.stringify(solvedBoard)));
  
      testCases.push({
        problemName: "Sudoku Solver",
        input: { board: solvedBoard },
        expected_output,
      });
    }
  
    return testCases;
  };
  
  export default generateSudokuSolverTestCases;
  