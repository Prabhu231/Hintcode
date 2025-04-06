const isValid = function(s: string): boolean {
    const stack: string[] = [];
    const map: { [key: string]: string } = { ')': '(', '}': '{', ']': '[' };

    for (const char of s) {
        if (char in map) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
};

const generateValidParenthesesTestCases = (count: number) => {
    const testCases = [];

    const generateBalancedParentheses = (length: number): string => {
        let stack: string[] = [];
        let result: string[] = [];
        const pairs: { [key: string]: string } = { "(": ")", "{": "}", "[": "]" };
        const openBrackets = Object.keys(pairs);

        while (stack.length < length / 2) {
            let openBracket = openBrackets[Math.floor(Math.random() * openBrackets.length)];
            stack.push(openBracket);
            result.push(openBracket);
        }

        while (stack.length > 0) {
            let last = stack.pop()!;
            result.push(pairs[last]);
        }

        for (let i = 0; i < 2; i++) {
            let idx1 = Math.floor(Math.random() * result.length);
            let idx2 = Math.floor(Math.random() * result.length);
            [result[idx1], result[idx2]] = [result[idx2], result[idx1]];
        }

        return result.join("");
    };

    for (let i = 0; i < count; i++) {
        let length = (Math.floor(Math.random() * 5) + 2) * 2; 
        let s = generateBalancedParentheses(length);
        let expected_output = isValid(s); 

        testCases.push({
            problemName: "Valid Parentheses",
            input: { s },
            expected_output,
        });
    }
    
    return testCases;
};




export default generateValidParenthesesTestCases;
