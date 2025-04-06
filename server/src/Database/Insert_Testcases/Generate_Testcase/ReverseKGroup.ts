const generateReverseKGroupTestCases = (count: number) => {
    const testCases = [];
  
    for (let i = 0; i < count; i++) {
      let length = Math.floor(Math.random() * 6) + 1; // Generate a random length between 1 and 6
      let values = Array.from({ length }, () => Math.floor(Math.random() * 10) + 1); // Random values between 1 and 10
      let k = Math.floor(Math.random() * length) + 1; // Generate a random k between 1 and length
  
      // Function to reverse the list in k-groups
      const reverseKGroup = (arr: number[], k: number) => {
        let result: number[] = [];
        for (let j = 0; j < arr.length; j += k) {
          if (j + k <= arr.length) {
            result.push(...arr.slice(j, j + k).reverse());
          } else {
            result.push(...arr.slice(j)); // Append remaining elements as is
          }
        }
        return result;
      };
  
      let expected_output = reverseKGroup(values, k);
  
      testCases.push({
        problemName: "Reverse Nodes in k-Group",
        input: { head: values, k },
        expected_output,
      });
    }
  
    return testCases;
  };
  
  export default generateReverseKGroupTestCases;
  