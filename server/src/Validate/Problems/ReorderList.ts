import connectDB from "../../Database/db";
import ReorderListTestCase from "../../Database/Schemas/ReorderListSchema"; // Import the schema
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForReorderList = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await ReorderListTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => {
        const input = `{${tc.input.head.join(", ")}}`;
        const expectedOutput = `{${tc.expected_output.join(", ")}}`;
        return `{${input}, ${expectedOutput}}`;
      })
      .join(",\n");

    // console.log("Test Case String: ", testCaseString);

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
          vector<int> inputList = testcase.first;
          vector<int> expected = testcase.second;

          ListNode* inputHead = createList(inputList);
          reorderList(inputHead); // Call the function to reorder list
          vector<int> result = toVector(inputHead);

          // Compare result with expected output
          if (result.size() != expected.size()) {
              cout << "false" << endl;
          } else {
              bool flag = true;
              for (int i = 0; i < result.size(); i++) {
                  if (result[i] != expected[i]) flag = false;
              }
              cout << (flag ? "true" : "false") << endl;
          }
      }
      return 0;
  }
`;

    // console.log("Generated C++ Code: ", cppCode);

    // Execute the C++ code
    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    // Read the output file
    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n").map(line => line.trim());;

    // console.log('Output: ', outputs)

    // Track failed test cases
    const failedTestCases = [];

    // Check if any test case failed
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

export default runTestsForReorderList;
