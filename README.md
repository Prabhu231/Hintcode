# 🚀 Hintcode

**Hintcode** is a full-stack platform that helps users master **data structures and algorithms** through real-time C++ code execution. It offers an intuitive code editor, AI-powered hints, and automated test validation to provide a seamless problem-solving experience.

https://www.hintcode.in

---

![image](https://github.com/user-attachments/assets/33a3b849-48dc-4311-8a4f-a142febbde65)


## 🧠 Features

- 📚 50+ curated DSA problems (Graphs, Dynamic Programming, Arrays, etc.)
- ⚡ Real-time C++ code execution with automated test case validation
- 🤖 AI-powered hints using Groq's **LLaMA 3.3-70B** model
- 🧠 Monaco-based code editor with syntax highlighting
- 🔁 Redis-powered job queue and result caching
- 🧪 Scalable backend for efficient code testing

---

## 🧰 Tech Stack

### 🖥️ Frontend (`/client`)
- **React** (with **TypeScript**)
- **Material UI (MUI)** for sleek UI components
- **Monaco Editor** for rich in-browser code editing
- **React Router** for navigation

### 🖧 Backend (`/server`)
- **Node.js**, **Express**, **TypeScript**
- **MongoDB** for problem and test case storage
- **Redis** for caching and execution tracking
- **BullMQ** for job queuing
- **Groq AI** for hint generation (LLaMA 3.3-70B)
- **g++** compiler for executing C++ code

---

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- `g++` installed and accessible in your system's PATH

---

## ⚙️ Getting Started

### 1. Ensure you have configured env files and have Mongo DB up and running

### 2. Clone the Repository

```bash
git clone https://github.com/Prabhu231/Hintcode.git
cd Hintcode
```

### 3. Client
```bash
cd client
npm install
npm start
```

### 4. Server
```bash
cd server
npm install
npm run dev
```

### 4. Insert Testcases
```bash
cd server
npm run insert_data
```

### 5. Ensure you have **Redis** running, either use **Docker**
```bash
docker run -p 6379:6379 redis
```
#### or install redis locally

### 6. Run worker 
```bash
npm run worker
```


