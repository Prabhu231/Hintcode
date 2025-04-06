import { Queue } from "bullmq";
import { v4 as uuidv4 } from "uuid";


const queue = new Queue("code_executor");

const init = async (code: string, problem: Number) => {
    try {
        const id = uuidv4();
        const res = await queue.add(id, { code,problem, removeOnComplete: true, removeOnFail: true }, { jobId: id, removeOnComplete: true, removeOnFail: true });
        // console.log("Added job id: ", id, code, problem)
        return id
    }

    catch (err) {
        return ""
    }

}





export default init;
