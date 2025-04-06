import connectDB from "../../Database/db";
import RemoveNthNodeTestCase from "../../Database/Schemas/RemoveNthNodeSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForRemoveNthFromEnd = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await RemoveNthNodeTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => {
        const input = `{${tc.input.head.join(", ")}}`;
        const n = tc.input.n;
        const expectedOutput = `{${tc.expected_output.join(", ")}}`;
        return `{{${input}, ${n}}, ${expectedOutput}}`;
      })
      .join(",\n");

    // console.log('Formatted Test Cases:', testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
  #include <bits/stdc++.h>
  using namespace std;

  struct ListNode {
      int val;
      ListNode* next;
      ListNode(int x) : val(x), next(nullptr) {}
  };

  ${cppFunction}

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

  vector<int> toVector(ListNode* head) {
      vector<int> result;
      while (head) {
          result.push_back(head->val);
          head = head->next;
      }
      return result;
  }

  int main() {
      vector<pair<pair<vector<int>, int>, vector<int>>> testCases = {${testCaseString}};

      for (auto &testcase : testCases) {
          ListNode* inputHead = createList(testcase.first.first);
          int n = testcase.first.second;
          ListNode* modifiedHead = removeNthFromEnd(inputHead, n);
          vector<int> result = toVector(modifiedHead);

          if (result.size() != testcase.second.size()) {
              cout << "false" << endl;
          } else {
              bool flag = true;
              for (size_t i = 0; i < result.size(); i++) {
                  if (result[i] != testcase.second[i]) flag = false;
              }
              cout << (flag ? "true" : "false") << endl;
          }
      }
      return 0;
  }
`;

    // console.log("C++ Code:", cppCode);

    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n");

    const failedTestCases = [];
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
        failedTestCase: `[${failedTestCases[0].testCase.input.head}], n=${failedTestCases[0].testCase.input.n}`,
      };
    }
  } catch (error) {
    // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForRemoveNthFromEnd;