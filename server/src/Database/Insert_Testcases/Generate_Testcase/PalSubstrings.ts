const countPalindromicSubstrings = (s: string): number => {
    let count = 0;

    const expandAroundCenter = (left: number, right: number) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            count++;
            left--;
            right++;
        }
    };

    for (let i = 0; i < s.length; i++) {
        expandAroundCenter(i, i);     // Odd length palindromes
        expandAroundCenter(i, i + 1); // Even length palindromes
    }

    return count;
};

const generatePalindromicSubstringsTestCases = (count: number) => {
    const testCases = [];
    const characters = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < count; i++) {
        let s = Array.from({ length: Math.floor(Math.random() * 15) + 5 }, () =>
            characters[Math.floor(Math.random() * characters.length)]
        ).join("");

        let expected_output = countPalindromicSubstrings(s);

        testCases.push({
            problemName: "Palindromic Substrings",
            input: { s },
            expected_output,
        });
    }

    return testCases;
};

export default generatePalindromicSubstringsTestCases;
