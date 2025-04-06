import connectDB from "../../Database/db";
import CountingBitsTestCase from "../../Database/Schemas/CountingBitsSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForCountingBits = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch Counting Bits test cases from MongoDB
    const testCases = await CountingBitsTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test case data
    const testCaseString = testCases.map(tc => `${tc.input.n}`).join(", ");

    // console.log("Formatted test cases:", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<int> testCases = { ${testCaseString} };

          for (int n : testCases) {
              vector<int> result = countBits(n);
              for (int num : result) {
                  cout << num << " ";
              }
              cout << endl;
          }
          return 0;
      }`;

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
    const outputs = (await fs.readFile(outputPath, "utf8")).trim().split("\n");

    // Validate results
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i].trim().split(" ").map(Number);
      const expected = testCase.expected_output;

      if (JSON.stringify(output) === JSON.stringify(expected)) {
        // console.log(
          `✅ Test ${i + 1} Passed! Input: n=${testCase.input.n} → Output: ${output}`
        );
      } else {
        // console.error(
          `❌ Test ${i + 1} Failed! Input: n=${testCase.input.n} → Expected: ${expected}, but got: ${output}`
        );
        return { success: false, failedTestCase: `n = ${testCase.input.n}` };
      }
    }

    return { success: true };
  } catch (error) {
    // console.error("Error:", error);
    return { success: false, error };
  } finally {
    connection.close();
  }
};

export default runTestsForCountingBits;
