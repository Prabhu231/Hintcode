import connectDB from "../../Database/db";
import ReverseBitsTestCase from "../../Database/Schemas/ReverseBitsSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForReverseBits = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch Reverse Bits test cases from MongoDB
    const testCases = await ReverseBitsTestCase.find();
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
          vector<uint32_t> testCases = { ${testCaseString} };

          for (uint32_t n : testCases) {
              uint32_t result = reverseBits(n);
              cout << result << endl;
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
      const output = parseInt(outputs[i].trim(), 10);
      const expected = testCase.expected_output;

      if (output === expected) {
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

export default runTestsForReverseBits;
