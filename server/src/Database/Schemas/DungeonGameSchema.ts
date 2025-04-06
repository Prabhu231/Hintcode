import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IDungeonGameTestCase extends IBaseTestCase {
    input: {
        dungeon: number[][];
    };
    expected_output: number;
}

const DungeonGameSchema = new Schema({
    problemName: { type: String, required: true },
    description: {
        type: String,
        default: `
The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of m x n rooms laid out in a 2D grid. Our valiant knight was initially positioned in the top-left room and must fight his way through dungeon to rescue the princess.
The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.
Some of the rooms are guarded by demons (represented by negative integers), so the knight loses health upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that increase the knight's health (represented by positive integers).
To reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.
Return the knight's minimum initial health so that he can rescue the princess.
Note that any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

 `
    },
    input: {
        dungeon: { type: [[Number]], required: true },
    },
    expected_output: { type: Number, required: true },
    code: {
        type: String,
        default: `
int calculateMinimumHP(vector<vector<int>>& dungeon) {
    // Complete the function
}
        `
    },
    bestCaseComplexity: {
        type: String,
        default: "O(m * n)"
    },
    sampleTestcases: {
        type: String,
        default: `
Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7

Input: dungeon = [[0,-3]]
Output: 4

Input: dungeon = [[100]]
Output: 1
        `
    }
});

const DungeonGameTestCase = model<IDungeonGameTestCase>(
    "DungeonGameTestCase",
    DungeonGameSchema
);

export default DungeonGameTestCase;
