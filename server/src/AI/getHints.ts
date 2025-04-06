import groq from "./groq";

async function getAIHint(code: string, problemStatement: string) {
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a highly skilled coding assistant specialized in LeetCode-style algorithm problems. 

Your goal is to:
- Carefully analyze the **user's code** and the **problem statement**.
- Identify the **approach or technique** (e.g., DFS, BFS, sliding window, dynamic programming, stack-based parsing) the user is trying to implement.
- Provide a **subtle and concise hint** that nudges the user in the right direction, without giving away the answer or exact lines to change.
- Avoid directly pointing out bugs or giving full explanations. Instead, guide the user with light clues about possible logical gaps, edge cases, time complexity, or overlooked conditions.

Never reveal the full solution. Your tone should be encouraging and intellectually stimulating.
        `.trim(),
      },
      {
        role: "user",
        content: `
Problem Statement:
${problemStatement}

Code:
${code}

Can you give a subtle hint based on the my current approach that can help me debug or improve my solution?
        `.trim(),
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  return completion.choices[0].message.content;
}

export default getAIHint;
