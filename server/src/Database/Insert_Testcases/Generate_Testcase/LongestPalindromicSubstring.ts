const longestPalindrome = (s: string): string => {
    if (s.length <= 1) return s;
  
    let start = 0, maxLength = 1;
  
    const expandAroundCenter = (left: number, right: number) => {
      while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
      }
      return right - left - 1;
    };
  
    for (let i = 0; i < s.length; i++) {
      let len1 = expandAroundCenter(i, i); // Odd length palindrome
      let len2 = expandAroundCenter(i, i + 1); // Even length palindrome
  
      let len = Math.max(len1, len2);
      if (len > maxLength) {
        maxLength = len;
        start = i - Math.floor((maxLength - 1) / 2);
      }
    }
  
    return s.substring(start, start + maxLength);
  };
  
  const generateLongestPalindromicSubstringTestCases = (count: number) => {
    const testCases = [];
    const characters = "abcdefghijklmnopqrstuvwxyz";
  
    for (let i = 0; i < count; i++) {
      let s = Array.from({ length: Math.floor(Math.random() * 15) + 5 }, () =>
        characters[Math.floor(Math.random() * characters.length)]
      ).join("");
  
      let expected_output = longestPalindrome(s);
  
      testCases.push({
        problemName: "Longest Palindromic Substring",
        input: { s },
        expected_output,
      });
    }
  
    return testCases;
  };
  
  export default generateLongestPalindromicSubstringTestCases;
  