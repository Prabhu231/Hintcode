import IBaseTestCase from "./BaseSchema";
import { Schema, model } from "mongoose";

interface IReverseBitsTestCase extends IBaseTestCase {
    input: {
        n: number;  
    };
    expected_output: number;  
}

const ReverseBitsSchema = new Schema({
    problemName: { type: String, required: true },
    description: {
        type: String,
        default: `
Reverse bits of a given 32 bits unsigned integer.
Note:
- The input integer is a 32-bit unsigned integer.
- The function should return a 32-bit unsigned integer with reversed bits.`
    },
    input: {
        n: { type: Number, required: true }  // 32-bit unsigned integer
    },
    expected_output: { type: Number, required: true }, // The reversed integer
    code: {
        type: String,
        default: `
            uint32_t reverseBits(uint32_t n) {
            
            }
        `
    },
    bestCaseComplexity: {
        type: String,
        default: "O(1)", // Since it's a fixed 32-bit operation
    },
    sampleTestcases: {
        type: String,
        default: `
        Input: n = 43261596 (00000010100101000001111010011100 in binary)
        Output: 964176192 (00111001011110000010100101000000 in binary)

        Input: n = 4294967293 (11111111111111111111111111111101 in binary)
        Output: 3221225471 (10111111111111111111111111111111 in binary)

        Input: n = 0
        Output: 0
        `
    }
});

const ReverseBitsTestCase = model<IReverseBitsTestCase>(
    "ReverseBitsTestCase",
    ReverseBitsSchema
);

export default ReverseBitsTestCase;
