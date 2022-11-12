import { Router } from "express";

export const aliveRouter = () => {
  const router = Router();

  router.get("/is_alive", (req, res) => res.json({ alive: true }));

  return router;
};
