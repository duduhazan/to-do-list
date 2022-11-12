import { Router } from "express";

export const tasksRouter = () => {
  const router = Router();

  router.get("/tasks", (req, res) => {
    return res.json([]);
  });

  router.delete("/tasks/:id", (req, res) => {
    return res.send(`deleted task ${req.params.id}`);
  });

  return router;
};
