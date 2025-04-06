const canPartition = (nums: number[]): boolean => {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2 !== 0) return false;

    const target = sum / 2;
    const dp = new Set<number>();
    dp.add(0);

    for (const num of nums) {
        const nextDP = new Set(dp);
        for (const partialSum of dp) {
            if (partialSum + num === target) return true;
            nextDP.add(partialSum + num);
        }
        dp.clear();
        for (const value of nextDP) dp.add(value);
    }
    
    return dp.has(target);
};

const generatePartitionEqualSubsetSumTestCases = (count: number) => {
    const testCases = [];
    
    const generateRandomArray = (size: number, maxValue: number): number[] => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * maxValue) + 1);
    };

    const generatePartitionableArray = (size: number, maxValue: number): number[] => {
        let subsetSum = Math.floor(Math.random() * maxValue) + 1;
        let nums = [subsetSum];

        for (let i = 1; i < size - 1; i++) {
            let num = Math.floor(Math.random() * maxValue) + 1;
            nums.push(num);
            subsetSum += num;
        }
        
        nums.push(subsetSum); // Ensures partitioning is possible
        return nums;
    };

    for (let i = 0; i < count; i++) {
        let nums;
        let expected_output;

        if (i % 2 === 0) {
            // Generate a balanced partitionable array (true case)
            nums = generatePartitionableArray(Math.floor(Math.random() * 5) + 2, 10);
            expected_output = true;
        } else {
            // Generate a random array (may or may not be partitionable)
            nums = generateRandomArray(Math.floor(Math.random() * 6) + 2, 10);
            expected_output = canPartition(nums);
        }

        testCases.push({
            problemName: "Partition Equal Subset Sum",
            input: { nums },
            expected_output,
        });
    }

    return testCases;
};

export default generatePartitionEqualSubsetSumTestCases;
