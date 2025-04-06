
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL!);

const setCompletedJob = async (id: string, result: any) => {
  await redis.set(`job:${id}:result`, JSON.stringify(result), "EX", 100);
};

const getCompletedJob = async (id: string) => {
  const res = await redis.get(`job:${id}:result`);
  return res ? JSON.parse(res) : null;
};

const setFailedJob = async (id: string, reason: any) => {
  await redis.set(`job:${id}:error`, reason, "EX", 100);
};

const getFailedJob = async (id: string) => {
  return await redis.get(`job:${id}:error`);
};

export { setCompletedJob, getCompletedJob, setFailedJob, getFailedJob };
