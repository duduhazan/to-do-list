import express from "express";
import cors from "cors";
import { tasksRouter } from "./routes/tasks.route";
import { connectDB } from "./connect-to-db";

async function startServer() {
  await connectDB("mongodb://localhost:27017/to-do");
  const port = 3500;
  const app = express();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));

  app.use(express.json());

  app.use(tasksRouter());

  app.listen(3500, () => {
    console.log(`started server on port ${port}`);
  });
}

startServer();
