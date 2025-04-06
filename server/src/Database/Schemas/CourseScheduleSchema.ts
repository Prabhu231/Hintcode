import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface ICourseScheduleTestCase extends IBaseTestCase {
  input: {
    numCourses: number;
    prerequisites: number[][];
  };
  expected_output: boolean;
}

const CourseScheduleSchema = new Schema({
  problemName: { type: String, required: true, default: "Course Schedule" },
  description: {
    type: String,
    default:
      `There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1. Some courses have prerequisites. Given an array prerequisites where prerequisites[i] = [a, b] means you must take course b before course a, determine if it is possible to finish all courses.`,
  },
  input: {
    numCourses: { type: Number, required: true },
    prerequisites: { type: [[Number]], required: true },
  },
  expected_output: { type: Boolean, required: true },
  code: {
    type: String,
    default: 
    `
bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
  // Complete the function 
}`,
  },
  bestCaseComplexity: {
    type: String,
    default: "O(V + E)", 
  },
  sampleTestcases: {
    type: String,
    default: 
      `
    Input: numCourses = 2, prerequisites = [[1,0]]
    Output: true

    Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
    Output: false

    Input: numCourses = 4, prerequisites = [[1,0],[2,1],[3,2]]
    Output: true

    Input: numCourses = 3, prerequisites = [[1,0],[0,2],[2,1]]
    Output: false
    `,
  },
});

const CourseScheduleTestCase = model<ICourseScheduleTestCase>(
  "CourseScheduleTestCase",
  CourseScheduleSchema
);

export default CourseScheduleTestCase;
