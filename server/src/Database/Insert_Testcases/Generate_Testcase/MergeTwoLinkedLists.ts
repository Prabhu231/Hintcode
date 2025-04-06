const generateMergeTwoSortedLinkedListsTestCases = (count: number) => {
    const testCases = [];
  
    for (let i = 0; i < count; i++) {
      let length1 = Math.floor(Math.random() * 6) + 1; 
      let length2 = Math.floor(Math.random() * 6) + 1; 
      let list1 = Array.from({ length: length1 }, () => Math.floor(Math.random() * 10) + 1);
      let list2 = Array.from({ length: length2 }, () => Math.floor(Math.random() * 10) + 1);
  
   
      list1.sort((a, b) => a - b);
      list2.sort((a, b) => a - b);
  
      let expected_output = [...list1, ...list2].sort((a, b) => a - b);
  
      testCases.push({
        problemName: "Merge Two Sorted Linked Lists",
        input: { list1, list2 },
        expected_output,
      });
    }
  
    return testCases;
};

export default generateMergeTwoSortedLinkedListsTestCases;
