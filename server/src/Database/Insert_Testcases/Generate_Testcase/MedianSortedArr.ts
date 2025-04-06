const generateMedianOfTwoSortedArraysTestCases = (count: number) => {
    const testCases = [];
    for (let i = 0; i < count; i++) {
      // Generate random arrays
      let nums1 = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () =>
        Math.floor(Math.random() * 100)
      ).sort((a, b) => a - b); // Sort to ensure it's a sorted array
      
      let nums2 = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, () =>
        Math.floor(Math.random() * 100)
      ).sort((a, b) => a - b); // Sort to ensure it's a sorted array
  
      // Calculate the median of the two sorted arrays
      const combined = [...nums1, ...nums2].sort((a, b) => a - b);
      const len = combined.length;
      let median;
      if (len % 2 === 0) {
        median = (combined[len / 2 - 1] + combined[len / 2]) / 2;
      } else {
        median = combined[Math.floor(len / 2)];
      }
  
      testCases.push({
        problemName: "Median of Two Sorted Arrays",
        description:
          "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        input: { nums1, nums2 },
        expected_output: median,
      });
    }
    return testCases;
  };
  
  export default generateMedianOfTwoSortedArraysTestCases;
  