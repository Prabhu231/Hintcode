const maxSlidingWindow = (nums: number[], k: number): number[] => {
    const result: number[] = [];
    const deque: number[] = []; 

    for (let i = 0; i < nums.length; i++) {

        if (deque.length && deque[0] < i - k + 1) {
            deque.shift();
        }

        while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }

    
        deque.push(i);

        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
};

const generateSlidingWindowTestCases = (count: number) => {
    const testCases = [];
    const maxArraySize = 15; 
    const maxNumValue = 50;  

    for (let i = 0; i < count; i++) {
        let size = Math.floor(Math.random() * (maxArraySize - 5)) + 5; 
        let nums = Array.from({ length: size }, () => Math.floor(Math.random() * (2 * maxNumValue + 1)) - maxNumValue);
        let k = Math.floor(Math.random() * Math.min(size, 5)) + 1; 

        let expected_output = maxSlidingWindow(nums, k);

        testCases.push({
            problemName: "Sliding Window Maximum",
            input: { nums, k },
            expected_output,
        });
    }

    return testCases;
};

export default generateSlidingWindowTestCases;
