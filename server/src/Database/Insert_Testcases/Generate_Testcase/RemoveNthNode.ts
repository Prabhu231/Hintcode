const generateRemoveNthFromEndTestCases = (count: number) => {
    const testCases = [];
  
    for (let i = 0; i < count; i++) {
      let length = Math.floor(Math.random() * 6) + 1;
      let head = Array.from({ length }, () => Math.floor(Math.random() * 10) + 1); 
      let n = Math.floor(Math.random() * length) + 1; 
  

      let expected_output = [...head];
      expected_output.splice(-n, 1); 
  
      testCases.push({
        problemName: "Remove Nth Node From End of List",
        input: { head, n },
        expected_output,
      });
    }
  
    return testCases;
};

export default generateRemoveNthFromEndTestCases;
