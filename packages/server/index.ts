import express from "express";
import type { Request, Response } from "express";

const app = express();

// 🔹 Home route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from TypeScript Express!");
});

app.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "Hello from TypeScript Express!" });
});

// 🔹 PORT
const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
