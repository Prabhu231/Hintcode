const generateReverseLinkedListTestCases = (count: number) => {
    const testCases = [];
  
    for (let i = 0; i < count; i++) {
      let length = Math.floor(Math.random() * 6) + 1; 
      let values = Array.from({ length }, () => Math.floor(Math.random() * 10) + 1); 
  
  
      let expected_output = [...values].reverse();
  
      testCases.push({
        problemName: "Reverse a Linked List",
        input: { head: values },
        expected_output,
      });
    }
  
    return testCases;
  };
  
  export default generateReverseLinkedListTestCases;
  