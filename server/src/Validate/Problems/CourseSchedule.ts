import connectDB from "../../Database/db";
import CourseScheduleTestCase from "../../Database/Schemas/CourseScheduleSchema";
import executeCpp from "../ExecuteCPP";
import path from "path";
import fs from "fs-extra";
import { connection } from "mongoose";

const TEMP_DIR = path.join(__dirname, "../../../../temp_files");
fs.ensureDirSync(TEMP_DIR);

const runTestsForCourseSchedule = async (cppFunction: string) => {
    try {
        await connectDB();

        // Fetch test cases from MongoDB
        const testCases = await CourseScheduleTestCase.find();
        // console.log(`Retrieved ${testCases.length} test cases`);

        // Format test case data properly
        const testCaseString = testCases
            .map(tc =>
                `{ ${tc.input.numCourses}, { ${tc.input.prerequisites.length ? tc.input.prerequisites.map(([a, b]) => `{${a},${b}}`).join(", ") : ""} } }`
            )
            .join(",\n");

        // console.log("Formatted test cases: ", testCaseString);

        // Generate C++ code with properly formatted test cases
        const cppCode = `
      #include <bits/stdc++.h>
      using namespace std;

      ${cppFunction}  // Inject user function

      int main() {
          vector<pair<int, vector<pair<int, int>>>> testCases = { ${testCaseString} };

          for (auto testcase : testCases) {
              int numCourses = testcase.first;
              vector<pair<int, int>> prerequisites = testcase.second;

              vector<vector<int>> prereqList;
              for (auto& p : prerequisites) {
                  prereqList.push_back({p.first, p.second});
              }

              bool result = canFinish(numCourses, prereqList);
              cout << (result ? "true" : "false") << endl;
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
            const expected = testCase.expected_output ? "true" : "false";

            if (output === expected) {
                // console.log(
                    `✅ Test ${i + 1} Passed! Input: numCourses=${testCase.input.numCourses}, prerequisites=${JSON.stringify(
                        testCase.input.prerequisites
                    )} → Output: ${output}`
                );
            } else {
                // console.error(
                    `❌ Test ${i + 1} Failed! Input: numCourses=${testCase.input.numCourses}, prerequisites=${JSON.stringify(
                        testCase.input.prerequisites
                    )} → Expected: ${expected}, but got: ${output}`
                );
                return {
                    success: false,
                    failedTestCase: `numCourses=${testCase.input.numCourses}, prerequisites=${JSON.stringify(
                        testCase.input.prerequisites
                    )}`,
                };
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

export default runTestsForCourseSchedule;
