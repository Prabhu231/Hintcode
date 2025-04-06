const maxProduct = (nums: number[]): number => {
    let maxProd = nums[0], minProd = nums[0], result = nums[0];

    for (let i = 1; i < nums.length; i++) {
        let temp = maxProd;
        maxProd = Math.max(nums[i], nums[i] * maxProd, nums[i] * minProd);
        minProd = Math.min(nums[i], nums[i] * temp, nums[i] * minProd);
        result = Math.max(result, maxProd);
    }

    return result;
};

const generateMaximumProductSubarrayTestCases = (count: number) => {
    const testCases = [];

    const generateRandomArray = (size: number, range: number) => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * (2 * range + 1)) - range);
    };

    for (let i = 0; i < count; i++) {
        const length = Math.floor(Math.random() * 5) + 3; 
        const nums = generateRandomArray(length, 10);
        const expected_output = maxProduct(nums); 

        testCases.push({
            problemName: "Maximum Product Subarray",
            input: { nums },
            expected_output,
        });
    }

    return testCases;
};

export default generateMaximumProductSubarrayTestCases;
