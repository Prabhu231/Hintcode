const exist = function(board: string[][], word: string) {
    const rows = board.length;
    const cols = board[0].length;
    
    function backtrack(i: number, j: number, index: number): boolean {
        if (index === word.length) { return true; }
        if (i < 0 || i >= rows || j < 0 || j >= cols) { return false; }
        if (board[i][j] !== word[index]) { return false; }
        
        const tempValueHolder = board[i][j];
        board[i][j] = "#";
        
        const found = backtrack(i + 1, j, index + 1) ||
            backtrack(i - 1, j, index + 1) ||
            backtrack(i, j + 1, index + 1) ||
            backtrack(i, j - 1, index + 1)
            
        board[i][j] = tempValueHolder;
        return found;
    }
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) { return true; }
        }
    }
    return false;    
};

const generateWordSearchTestCases = (count: number) => {
    const testCases = [];
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  

    const generateRandomBoard = (m: number, n: number) => {
        return Array.from({ length: m }, () =>
            Array.from({ length: n }, () =>
                characters[Math.floor(Math.random() * characters.length)]
            )
        );
    };

 
    const generateRandomWord = (maxLength: number) => {
        const wordLength = Math.floor(Math.random() * Math.min(maxLength, 10)) + 1;
        return Array.from({ length: wordLength }, () =>
            characters[Math.floor(Math.random() * characters.length)]
        ).join("");
    };

    for (let i = 0; i < count; i++) {
   
        const m = Math.floor(Math.random() * 4) + 3;
        const n = Math.floor(Math.random() * 4) + 3;
        

        const board = generateRandomBoard(m, n);
        const word = generateRandomWord(Math.min(m * n, 10));  

        const expected_output = exist(board, word);

        testCases.push({
            problemName: "Word Search",
            input: { board, word },
            expected_output: expected_output,
        });
    }

    return testCases;
};

export default generateWordSearchTestCases;
