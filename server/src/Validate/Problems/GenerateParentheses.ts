import connectDB from "../../Database/db";
import GenerateParenthesesTestCase from "../../Database/Schemas/GenerateParenthesesSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForGenerateParentheses = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await GenerateParenthesesTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Extract test inputs
    const testCaseString = testCases.map(tc => tc.input.n).join(", ");
    // console.log("n values: ", testCaseString);

    // Generate C++ code with properly formatted test cases
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      void printResult(vector<string> result) {
          for (const string &s : result) {
              cout << s << " ";
          }
          cout << endl;
      }

      int main() {
          vector<int> testCases = { ${testCaseString} };

          for (int n : testCases) {
              vector<string> result = generateParenthesis(n);
              printResult(result);
          }
          return 0;
      }`;

    // console.log("Generated C++ Code:\n", cppCode);

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
      const output = outputs[i].trim().split(" ").sort().join(",");
      const expected = testCase.expected_output.sort().join(",");

      if (output === expected) {
        // console.log(`✅ Test ${i + 1} Passed! Input: n = ${testCase.input.n} → Output: [${output}]`);
      } else {
        // console.error(`❌ Test ${i + 1} Failed! Input: n = ${testCase.input.n} → Expected: [${expected}], but got: [${output}]`);
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

export default runTestsForGenerateParentheses;
