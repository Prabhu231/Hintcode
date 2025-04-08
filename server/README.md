
# 🧠 Hintcode — Backend

The backend service for **Hintcode**, a smart C++ solution evaluator. It handles code execution, test case evaluation, caching, job queuing, and even AI-powered features using LLaMA 3.3 via Groq.

## 🔧 Tech Stack

- **Node.js + Express**
- **TypeScript**
- **MongoDB + Mongoose** — problem & test case storage
- **Redis** — caching code execution results
- **BullMQ** — managing execution queues
- **Groq AI (LLaMA 3.3 70B)** — optional AI hints/explanations
- **child_process** — C++ compilation and execution
- **fs-extra** — for managing temp source files

## 🎯 Features

- Runs and validates C++ code securely
- Stores 51 algorithm problems and test cases
- Compares expected vs actual output
- Handles compilation and runtime errors
- Queues jobs using BullMQ and Redis for scalability
- Stores execution output for later retrieval

## 📦 Setup

```bash
cd backend
npm install
# Ensure Redis is running
npm run worker
npm run dev
```
