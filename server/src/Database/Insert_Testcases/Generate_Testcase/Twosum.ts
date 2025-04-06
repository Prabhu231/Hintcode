const generateTwoSumTestCases = (count: number) => {
  const testCases = [];

  for (let i = 0; i < count; i++) {
    const isPositive = Math.random() < 0.8; // 80% positive, 20% negative
    const length = Math.floor(Math.random() * 8) + 2; 

    if (isPositive) {
      const nums = Array.from({ length }, () => Math.floor(Math.random() * 100));
      const index1 = Math.floor(Math.random() * nums.length);
      let index2;
      do {
        index2 = Math.floor(Math.random() * nums.length);
      } while (index1 === index2);

      const target = nums[index1] + nums[index2];

      testCases.push({
        problemName: "Two Sum",
        description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
Return [-1, -1] if there are no two numbers that sum up to the target.`,
        input: { nums, target },
        expected_output: [index1, index2],
      });
    } else {

      const nums: number[] = [];
      const used = new Set<number>();
      while (nums.length < length) {
        const num = Math.floor(Math.random() * 50) * 2; 
        if (!used.has(num)) {
          used.add(num);
          nums.push(num);
        }
      }

      let target = Math.floor(Math.random() * 100) * 2 + 1;

      testCases.push({
        problemName: "Two Sum",
        description: `
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
Return an empty vector if there are no two numbers that sum up to the target.`,
        input: { nums, target },
        expected_output: [],
      });
    }
  }

  return testCases;
};

export default generateTwoSumTestCases;
