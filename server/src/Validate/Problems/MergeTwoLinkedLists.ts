import connectDB from "../../Database/db";
import MergeTwoLinkedListsTestCase from "../../Database/Schemas/MergeTwoLinkedListsSchema"; // Import the schema for merge
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForMergeTwoLinkedLists = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await MergeTwoLinkedListsTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => {
        const input1 = `{${tc.input.list1.join(", ")}}`;
        const input2 = `{${tc.input.list2.join(", ")}}`;
        const expectedOutput = `{${tc.expected_output.join(", ")}}`;
        return `{${input1}, ${input2}, ${expectedOutput}}`;
      })
      .join(",\n");

    // console.log('Test case string: ', testCaseString);

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
      vector<vector<vector<int>>> testCases = {${testCaseString}};

      for (auto &testcase : testCases) {
          ListNode* inputHead1 = createList(testcase[0]);
          ListNode* inputHead2 = createList(testcase[1]);
          ListNode* mergedHead = mergeTwoLists(inputHead1, inputHead2);
          vector<int> result = toVector(mergedHead);

          // Compare result with expected output
          if(result.size() != testcase[2].size()) {
              cout<<"false"<<endl;
          } else {
              bool flag = true;
              for(int i=0; i<result.size(); i++) {
                  if(result[i] != testcase[2][i]) {
                      flag = false;
                  }
              }
              if(flag) cout<<"true"<<endl;
              else cout<<"false"<<endl;
          }
      }
      return 0;
  }
`;

    // console.log("C++ Code:", cppCode);

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
        failedTestCase: `[${failedTestCases[0].testCase.input.list1}], [${failedTestCases[0].testCase.input.list2}]`,
      };
    }
  } catch (error) {
    // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForMergeTwoLinkedLists;
