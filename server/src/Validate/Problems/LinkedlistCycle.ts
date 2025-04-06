import connectDB from "../../Database/db";
import LinkedListCycleTestCase from "../../Database/Schemas/LinkedlistCycleSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForLinkedListCycle = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await LinkedListCycleTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
    .map(tc => {
      const input = `{{${tc.input.head.join(", ")}}, ${tc.input.pos}}`;
      const expectedOutput = tc.expected_output ? "true" : "false";
      return `{${input}, ${expectedOutput}}`;
    })
    .join(",\n");

    // console.log('Formatted test cases:', testCaseString);

    // Generate C++ code
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

  // Function to create linked list from array with a cycle
  ListNode* createList(vector<int>& vals, int pos) {
      ListNode* head = nullptr;
      ListNode* tail = nullptr;
      ListNode* cycleStart = nullptr;

      for (int i = 0; i < vals.size(); i++) {
          ListNode* newNode = new ListNode(vals[i]);
          if (!head) {
              head = tail = newNode;
          } else {
              tail->next = newNode;
              tail = newNode;
          }
          if (i == pos) {
              cycleStart = newNode;  // Mark the cycle start node
          }
      }
      if (tail && cycleStart) {
          tail->next = cycleStart;  // Create the cycle
      }
      return head;
  }

  int main() {
      vector<pair<pair<vector<int>, int>, bool>> testCases = {${testCaseString}};

      for (auto &testcase : testCases) {
          ListNode* inputHead = createList(testcase.first.first, testcase.first.second);
          bool result = hasCycle(inputHead);  // Call the C++ function

          // Compare result with expected output
          if (result == testcase.second) {
              cout << "true" << endl;
          } else {
              cout << "false" << endl;
          }
      }
      return 0;
  }
  `;

    // console.log("Generated C++ Code:", cppCode);

    // Execute the C++ code
    try {
      await executeCpp(cppCode);
    } catch (executionError) {
      // console.error("❌ Compilation Error:", executionError);
      return { success: false, syntaxError: executionError };
    }

    // Read the output file
    const outputPath = path.join(TEMP_DIR, "temp.txt");
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n").map(s => s.replace(/(\r\n|\n|\r)/gm, ""));

    // Track failed test cases
    const failedTestCases = [];

    // console.log('outputs: ', outputs)

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
        failedTestCase: `[${failedTestCases[0].testCase.input.head}], pos = ${failedTestCases[0].testCase.input.pos}`,
      };
    }
  } catch (error) {
    // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForLinkedListCycle;
