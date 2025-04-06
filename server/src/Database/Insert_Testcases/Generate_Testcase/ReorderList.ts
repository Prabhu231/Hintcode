const generateReorderListTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let length = Math.floor(Math.random() * 6) + 1; // Generate a random length between 1 and 6
        let values = Array.from({ length }, () => Math.floor(Math.random() * 10) + 1); // Random values between 1 and 10

        // Function to reorder the list as per the problem statement
        const reorderList = (arr: number[]) => {
            let result: number[] = [];
            let left = 0, right = arr.length - 1;
            while (left <= right) {
                if (left === right) {
                    result.push(arr[left]);
                } else {
                    result.push(arr[left], arr[right]);
                }
                left++;
                right--;
            }
            return result;
        };

        let expected_output = reorderList(values);

        testCases.push({
            problemName: "Reorder List",
            input: { head: values },
            expected_output,
        });
    }

    return testCases;
};

export default generateReorderListTestCases;
