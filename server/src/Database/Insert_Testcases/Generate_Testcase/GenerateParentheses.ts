const generateParenthesis = (n: number): string[] => {
    const result: string[] = [];

    const backtrack = (s: string, open: number, close: number) => {
        if (s.length === n * 2) {
            result.push(s);
            return;
        }
        if (open < n) backtrack(s + "(", open + 1, close);
        if (close < open) backtrack(s + ")", open, close + 1);
    };

    backtrack("", 0, 0);
    return result;
};

const generateParenthesesTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let n = Math.floor(Math.random() * 6) + 1; 
        let expected_output = generateParenthesis(n); 

        testCases.push({
            problemName: "Generate Parentheses",
            input: { n },
            expected_output,
        });
    }

    return testCases;
};

export default generateParenthesesTestCases;
