

const lengthOfLongestSubstring = function(s: string) {

  let cSet = new Set()
  let l = 0
  let  res = 0

  for(let i=0;i<s.length;i++){
      while(cSet.has(s[i])){
          cSet.delete(s[l])
          l+=1
      }
      cSet.add(s[i])
      res = Math.max(res,i-l+1)
  }

  return res
  
};


const generateLongestSubstringTestCases = (count: number) => {
    const testCases = [];
    const characters = "abcdefghijklmnopqrstuvwxyz";
  
    for (let i = 0; i < count; i++) {
      let s = Array.from({ length: Math.floor(Math.random() * 15) + 5 }, () =>
        characters[Math.floor(Math.random() * characters.length)]
      ).join("");
  
      let expected_output = lengthOfLongestSubstring(s); 
  
      testCases.push({
        problemName: "Longest Substring Without Repeating Characters",
        input: { s },
        expected_output,
      });
    }
    return testCases;
  };



  export default generateLongestSubstringTestCases