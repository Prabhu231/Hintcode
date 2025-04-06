import connectDB from "../../Database/db";
import CheapestFlightTestCase from "../../Database/Schemas/CheapestFlightSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForCheapestFlight = async (cppFunction: string) => {
  try {
    await connectDB();

    // Fetch test cases from MongoDB
    const testCases = await CheapestFlightTestCase.find();
    // console.log(`Retrieved ${testCases.length} test cases`);

    // Format test cases properly
    const testCaseString = testCases
      .map(
        (tc) =>
          `{ ${tc.input.n}, { ${tc.input.flights.map((f: number[]) => `{ ${f.join(", ")} }`).join(", ")} }, ${tc.input.src}, ${tc.input.dst}, ${tc.input.k} }`
      )
      .join(",\n");
    
    // console.log("Formatted test cases: ", testCaseString);

    // Generate C++ code
    const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      struct TestCase {
          int n;
          vector<vector<int>> flights;
          int src;
          int dst;
          int k;
      };

      int main() {
          vector<TestCase> testCases = { ${testCaseString} };

          for (auto tc : testCases) {
              int result = findCheapestPrice(tc.n, tc.flights, tc.src, tc.dst, tc.k);
              cout << result << endl;
          }
          return 0;
      }`;

    // console.log("Generated C++ Code: ", cppCode);

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

    // Validate results
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      const output = outputs[i].trim();
      const expected = testCase.expected_output.toString();

      if (output === expected) {
        // console.log(
          `✅ Test ${i + 1} Passed! n=${testCase.input.n}, src=${testCase.input.src}, dst=${testCase.input.dst}, k=${testCase.input.k} → Output: ${output}`
        );
      } else {
        // console.error(
          `❌ Test ${i + 1} Failed! n=${testCase.input.n}, src=${testCase.input.src}, dst=${testCase.input.dst}, k=${testCase.input.k} → Expected: ${expected}, but got: ${output}`
        );
        return { success: false, failedTestCase: `n=${testCase.input.n}, src=${testCase.input.src}, dst=${testCase.input.dst}, k=${testCase.input.k} flights = [${testCase.input.flights.join(',')}]` };
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

export default runTestsForCheapestFlight;
