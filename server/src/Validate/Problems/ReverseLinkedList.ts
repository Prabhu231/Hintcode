import connectDB from "../../Database/db";
import ReverseLinkedListTestCase from "../../Database/Schemas/ReverseLinkedListSchema"; // Import the schema
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForReverseLinkedList = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await ReverseLinkedListTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
    .map(tc => {
      const input =  `{${tc.input.head.join(", ")}}`;
      const expectedOutput = `{${tc.expected_output.join(", ")}}`;
      return `{${input}, ${expectedOutput}}`;
    })
    .join(",\n");
  

    // console.log('string: ', testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
  #include <bits/stdc++.h>
  using namespace std;

  // Linked list node definition
  struct ListNode {
      int val;
      ListNode* next;
      ListNode(int x) : val(x), next(nullptr) {}
  };

  ${cppFunction}

  // Function to create linked list from array
  ListNode* createList(vector<int>& vals) {
      ListNode* head = nullptr;
      ListNode* tail = nullptr;
      for (int val : vals) {
          ListNode* newNode = new ListNode(val);
          if (!head) {
              head = tail = newNode;
          } else {
              tail->next = newNode;
              tail = newNode;
          }
      }
      return head;
  }

  // Function to convert linked list to vector for easy comparison
  vector<int> toVector(ListNode* head) {
      vector<int> result;
      while (head) {
          result.push_back(head->val);
          head = head->next;
      }
      return result;
  }

  int main() {
      vector<pair<vector<int>, vector<int>>> testCases = {${testCaseString}};

      for (auto &testcase : testCases) {
          ListNode* inputHead = createList(testcase.first);
          ListNode* reversedHead = reverseList(inputHead);
          vector<int> result = toVector(reversedHead);

          // Compare result with expected output
          if(result.size() != testcase.second.size()) {
          cout<<"false"<<endl;
          } else {
          bool flag = true;
          for(int i=0;i<result.size();i++) {
          if(result[i] != testcase.second[i]) flag = false;
          }
          if(flag) cout<<"true"<<endl;
          else cout<<"false"<<endl; 
          }
      }
      return 0;
  }
`;

// console.log("C++ Code:", cppCode);



    // console.log('cppCode: ', cppCode);

    // Execute the C++ code only once
    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    // Read the output file
    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n");

    // Track failed test cases
    const failedTestCases = [];

    // Check if there is any "false" in the outputs
    for (let i = 0; i < outputs.length; i++) {
      if (outputs[i] === "false") {
        failedTestCases.push({
          testCase: testCases[i],
          output: outputs[i],
        });
      }
    }

    if (failedTestCases.length === 0) {
      // console.log("✅ All tests passed!");
      return { success: true };
    } else {
      // console.error("❌ Some tests failed!");
      return {
        success: false,
        failedTestCase: `[${failedTestCases[0].testCase.input.head}]`,
      };
    }
  } catch (error) {
    // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForReverseLinkedList;
