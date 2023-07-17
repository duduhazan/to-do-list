import express from "express";
import cors from "cors";
import { tasksRouter } from "./routes/tasks.route";
import { connectDB } from "./connect-to-db";
import { SignInRouter } from "./routes/signin.route";
import { SignUpRouter } from "./routes/signup";

async function startServer() {
  // await connectDB(process.env.DB_URL);
  // const port = process.env.PORT;
  // const app = express();

  // app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  await connectDB("mongodb://localhost:27017/to-do");
  const port = 3500;
  const app = express();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));

  app.use(express.json());

    app.use(SignInRouter());

    app.use(SignUpRouter());

  app.use(tasksRouter());

  app.listen(port, () => {
    console.log(`started server on port ${port}`);
  });
}

startServer();
