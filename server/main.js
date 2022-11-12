import express from "express";
import cors from "cors";
import { aliveRouter } from "./routes/alive";
import { tasksRouter } from "./routes/tasks.route";

function startServer() {
  const port = 3500;
  const app = express();

  app.use(cors());

  app.use(tasksRouter());

  app.use(aliveRouter());

  app.listen(3500, () => {
    console.log(`started server on port ${port}`);
  });
}

startServer();
