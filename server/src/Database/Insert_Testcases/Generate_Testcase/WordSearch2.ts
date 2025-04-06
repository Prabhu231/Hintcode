class TrieNode {
    children: Map<string, TrieNode>;
    isEnd: boolean;

    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    insert(word: string): void {
        let node: TrieNode = this.root;
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char)!;  // Using non-null assertion operator
        }
        node.isEnd = true;
    }
}

const findWords = function(board: string[][], words: string[]): string[] {
    const rows: number = board.length;
    const cols: number = board[0].length;
    const trie: Trie = new Trie();
    const result: Set<string> = new Set();

    // Build the Trie
    for (const word of words) {
        trie.insert(word);
    }

    function backtrack(i: number, j: number, node: TrieNode, path: string): void {
        if (node.isEnd) {
            result.add(path);
        }

        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] === "#") return;

        const temp: string = board[i][j];
        const nextNode: TrieNode | undefined = node.children.get(temp);
        
        if (nextNode) {
            board[i][j] = "#"; 

            backtrack(i + 1, j, nextNode, path + temp); 
            backtrack(i - 1, j, nextNode, path + temp); 
            backtrack(i, j + 1, nextNode, path + temp); 
            backtrack(i, j - 1, nextNode, path + temp); 

            board[i][j] = temp;
        }
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            backtrack(i, j, trie.root, "");
        }
    }

    return Array.from(result);
};

type TestCase = {
    problemName: string;
    input: {
        board: string[][];
        words: string[];
    };
    expected_output: string[];
};

const generateWordSearch2TestCases = (count: number): TestCase[] => {
    const testCases: TestCase[] = [];
    const characters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


    const generateRandomBoard = (m: number, n: number): string[][] => {
        return Array.from({ length: m }, () =>
            Array.from({ length: n }, () =>
                characters[Math.floor(Math.random() * characters.length)]
            )
        );
    };


    const generateRandomWords = (maxWords: number, maxLength: number): string[] => {
        const wordsCount: number = Math.floor(Math.random() * Math.min(maxWords, 10)) + 1;
        const words: string[] = [];
        for (let i = 0; i < wordsCount; i++) {
            const wordLength: number = Math.floor(Math.random() * Math.min(maxLength, 10)) + 1;
            const word: string = Array.from({ length: wordLength }, () =>
                characters[Math.floor(Math.random() * characters.length)]
            ).join("");
            words.push(word);
        }
        return words;
    };

    for (let i = 0; i < count; i++) {
      
        const m: number = Math.floor(Math.random() * 4) + 3;
        const n: number = Math.floor(Math.random() * 4) + 3;
        
    
        const board: string[][] = generateRandomBoard(m, n);
        const words: string[] = generateRandomWords(5, Math.min(m * n, 10)); 

        const expected_output: string[] = findWords(board, words);

        testCases.push({
            problemName: "Word Search II",
            input: { board, words },
            expected_output: expected_output,
        });
    }

    return testCases;
};

export default generateWordSearch2TestCases;
