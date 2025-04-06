const generateKthLargestTestCases = (count: number) => {
    const testCases = [];

    for (let i = 0; i < count; i++) {
        let length = Math.floor(Math.random() * 10) + 1; 
        let nums = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
        let k = Math.floor(Math.random() * length) + 1; 

        // Function to find the kth largest element
        const findKthLargest = (arr: number[], k: number) => {
            return arr.sort((a, b) => b - a)[k - 1];
        };

        let expected_output = findKthLargest(nums, k);

        testCases.push({
            problemName: "Kth Largest Element in an Array",
            input: { nums, k },
            expected_output,
        });
    }

    return testCases;
};

export default generateKthLargestTestCases;
