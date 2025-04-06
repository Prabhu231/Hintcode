

const climbStairs = (n: number): number => {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
};

const generateClimbingStairsTestCases = (count: number) => {
  const testCases = [];
  for (let i = 0; i < count; i++) {
    let n = Math.floor(Math.random() * 15) + 1; 
    let expected_output = climbStairs(n);
    testCases.push({
      problemName: "Climbing Stairs",
      input: { n },
      expected_output,
    });
  }
  return testCases;
};

export default generateClimbingStairsTestCases;
