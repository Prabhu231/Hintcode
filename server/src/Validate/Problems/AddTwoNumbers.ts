import connectDB from "../../Database/db";
import AddTwoNumbersTestCase from "../../Database/Schemas/AddTwoNumbersSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForAddTwoNumbers = async (cppFunction: string) => {
  try {
    await connectDB();


    const testCases = await AddTwoNumbersTestCase.find();
    // // console.log(`Retrieved ${testCases.length} test cases`);

    const testCaseString = testCases
      .map(tc => {
        const l1 = `{${tc.input.l1.join(", ")}}`;
        const l2 = `{${tc.input.l2.join(", ")}}`;
        const expectedOutput = `{${tc.expected_output.join(", ")}}`;
        return `{{${l1}, ${l2}}, ${expectedOutput}}`;
      })
      .join(",\n");

    // // console.log("Formatted Test Cases:", testCaseString);

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
      vector<pair<pair<vector<int>, vector<int>>, vector<int>>> testCases = {${testCaseString}};

      for (auto &testcase : testCases) {
          ListNode* l1 = createList(testcase.first.first);
          ListNode* l2 = createList(testcase.first.second);
          ListNode* resultHead = addTwoNumbers(l1, l2);
          vector<int> result = toVector(resultHead);

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


    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // // console.error("❌ Compilation Error:", executionError);
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
      // // console.log("✅ All tests passed!");
      return { success: true };
    } else {
      // // console.error("❌ Some tests failed!");
      return {
        success: false,
        failedTestCase: `[${failedTestCases[0].testCase.input.l1}] + [${failedTestCases[0].testCase.input.l2}]`,
      };
    }
  } catch (error) {
    // // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForAddTwoNumbers;
