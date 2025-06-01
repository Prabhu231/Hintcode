import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import init from "./Queue/producer";
import { getCompletedJob, getFailedJob } from "./Redis/redis";
import getAIHint from "./AI/getHints";
import getProblemDetails from "./Database/problemDetails";
import { problems } from "./Database/problems";
import rateLimit from 'express-rate-limit';
import connectDB from "./Database/db";
import { connection } from "mongoose";
import { Logger } from './logger';



dotenv.config();
const app = express();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1000, // 1000 Requests per windowMs
  message: "Our Server is Overloaded, please try again later",
});

app.use(limiter);

app.use(cors({
  origin: process.env.FRONTEND_URL as string,
  methods: ['GET', 'POST']
}));

app.use(express.json());

app.use(async (req: Request, res: Response, next) => {
  try {
    await connectDB()
    const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const a = await Logger.findOneAndUpdate(
      { ip },
      { $inc: { siteVisits: 1 }, $set: { lastUpdated: new Date() } },
      { upsert: true }
    );
    console.log(a)
  } catch(e) {
    console.log(e)
  } 
  finally {
    connection.close()
    next()
  }
})


app.get("/", (req: Request, res: Response) => {
  res.json({
    problems
  })
})



app.get("/problem/:id", async (req: Request, res: Response) => {

  // console.log("problem req: ", req.params.id)
  const id = req.params.id;
  const { description, code, bestCaseComplexity, sampleTestcases } = await getProblemDetails(id)

  res.json({
    description,
    code,
    bestCaseComplexity,
    sampleTestcases
  })
});

app.post("/problem/submit", async (req: Request, res: Response) => {
  try {

    try {
      const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      await connectDB()
      await Logger.findOneAndUpdate(
        { ip },
        { $inc: { submissions: 1 }, $set: { lastUpdated: new Date() } },
        { upsert: true }
      );
    } catch(e) {

    }
    finally {
      connection.close()
    }
    const { problemId, code } = req.body;

    if (!problemId || !code) {
      res.status(400).json({ message: "Problem ID and code are required" });
      return
    }

    const jobId = await init(code, problemId);
    if (!jobId) {
      res.status(500).json({ message: "Internal server error" });
      return
    }

    res.json({ jobId });
    return

  } catch (err) {
    // console.error(err);
    res.status(500).json({ message: "Internal server error" });
    return
  }
})

app.get("/check-status", async (req: Request, res: Response) => {
  const id = req.query.id as string;

  if (!id) {
    res.status(400).json({ message: "Job ID is required" });
    return
  }

  const completed = await getCompletedJob(id)
  if (completed) {
    res.json({ completed: true, result: completed });
    return
  }

  const failed = await getFailedJob(id)

  if (await getFailedJob(id)) {
    res.status(400).json({ completed: false, error: failed });
    return
  }

  res.json({ inProgress: true });
});

app.post("/get-ai-hint/", async (req: Request, res: Response) => {
  const problemStmt = req.body.problem
  const code = req.body.code

  const hint = await getAIHint(code, problemStmt)

  res.json({
    hint
  })
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));