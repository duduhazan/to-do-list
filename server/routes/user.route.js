import { Router } from "express";
import userModel from "../schemas/users.schema";

export const UserRouter = () => {
  const router = Router();

  router.get("/user", async (req, res) => {
    const user = await userModel.findById(req.user.id);
    res.json(user);
  });

  return router;
};
