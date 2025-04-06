const generateAddTwoNumbersTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let length1 = Math.floor(Math.random() * 6) + 1; // Random length between 1 and 6
        let length2 = Math.floor(Math.random() * 6) + 1; // Random length between 1 and 6

        let list1 = Array.from({ length: length1 }, () => Math.floor(Math.random() * 10)); // Random digits 0-9
        let list2 = Array.from({ length: length2 }, () => Math.floor(Math.random() * 10)); // Random digits 0-9

        const addTwoNumbers = (l1: number[], l2: number[]) => {
            let carry = 0;
            let result: number[] = [];
            let maxLength = Math.max(l1.length, l2.length);

            for (let i = 0; i < maxLength || carry; i++) {
                let sum = (l1[i] || 0) + (l2[i] || 0) + carry;
                result.push(sum % 10);
                carry = Math.floor(sum / 10);
            }

            return result;
        };

        let expected_output = addTwoNumbers(list1, list2);

        testCases.push({
            problemName: "Add Two Numbers",
            input: { l1: list1, l2: list2 },
            expected_output,
        });
    }

    return testCases;
};

export default generateAddTwoNumbersTestCases;
