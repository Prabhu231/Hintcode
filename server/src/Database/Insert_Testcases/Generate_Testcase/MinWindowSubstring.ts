const minWindow = function(s: string, t: string): string {
    if (t.length > s.length) return "";

    let left = 0, right = 0;
    let minLen = Infinity, minStart = 0;
    let charCount = new Map();
    let required = t.length;

    for (let char of t) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }

    while (right < s.length) {
        let rightChar = s[right];
        if (charCount.has(rightChar)) {
            charCount.set(rightChar, charCount.get(rightChar)! - 1);
            if (charCount.get(rightChar)! >= 0) {
                required--;
            }
        }
        right++;

        while (required === 0) {
            if (right - left < minLen) {
                minLen = right - left;
                minStart = left;
            }
            let leftChar = s[left];
            if (charCount.has(leftChar)) {
                charCount.set(leftChar, charCount.get(leftChar)! + 1);
                if (charCount.get(leftChar)! > 0) {
                    required++;
                }
            }
            left++;
        }
    }

    return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
};

const generateMinWindowSubstringTestCases = (count: number) => {
    const testCases = [];
    const characters = "abcdefghijklmnopqrstuvwxyz";
  
    for (let i = 0; i < count; i++) {
        let s = Array.from({ length: Math.floor(Math.random() * 15) + 5 }, () =>
            characters[Math.floor(Math.random() * characters.length)]
        ).join("");

        let tLength = Math.floor(Math.random() * Math.min(s.length, 5)) + 1;
        let t = Array.from({ length: tLength }, () =>
            s[Math.floor(Math.random() * s.length)]
        ).join("");

        let expected_output = minWindow(s, t) || "";

        testCases.push({
            problemName: "Minimum Window Substring",
            input: { s, t },
            expected_output,
        });
    }
    return testCases;
};

export default generateMinWindowSubstringTestCases;
