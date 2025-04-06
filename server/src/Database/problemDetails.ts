import { details } from './details'
import connectDB from './db'
import { connection } from 'mongoose'

interface ProblemDetails {
    description: string;
    code: string;
    bestCaseComplexity: string;
    sampleTestcases: string;
}

const getProblemDetails = async (id: string): Promise<ProblemDetails> => {
    try {

        await connectDB()
        const model = details[id]
        const prblm = await model.findOne()
        const description = prblm.description || 'Sorry No description available'
        const code = prblm.code || 'Sorry No description available'
        const bestCaseComplexity = prblm.bestCaseComplexity || ''
        const sampleTestcases = prblm.sampleTestcases || ''
        return {
            description,
            code,
            bestCaseComplexity,
            sampleTestcases
        }
    } catch (err) {
        // console.log('Error getting details: ', err)
        return {
            description: 'Sorry No description available',
            code: 'Sorry No description available',
            bestCaseComplexity: '',
            sampleTestcases: ''
        }
    } finally {
        await connection.close()
    }
}


export default getProblemDetails