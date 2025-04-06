import connectDB from "../../Database/db";
import ClimbingStairsTestCase from "../../Database/Schemas/ClimbingStairsSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForClimbingStairs = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await ClimbingStairsTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data properly
    const testCaseString = testCases
      .map(tc => `{${tc.input.n}, ${tc.expected_output}}`)
      .join(",\n");

    // console.log("Formatted test cases:", testCaseString);

    // Generate C++ code
    const cppCode = `
    #include <bits/stdc++.h>
    using namespace std;

    ${cppFunction}

    int main() {
        vector<pair<int, int>> testCases = {${testCaseString}};

        for (auto &testcase : testCases) {
            int result = climbStairs(testcase.first);  // Call the C++ function

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
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n")
    .map((s) => s.replace(/(\r\n|\n|\r)/gm, ""));

    // Track failed test cases
    const failedTestCases = [];

    // console.log("Outputs: ", outputs)

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
        failedTestCase: `n = ${failedTestCases[0].testCase.input.n}`,
      };
    }
  } catch (error) {
    // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForClimbingStairs;
