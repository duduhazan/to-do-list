import { Router } from "express";
import { StatusCode } from "status-code-enum";
import * as jsonWebtoken from "jsonwebtoken";
import userModel from "../schemas/users.schema";
import { compareSync } from "bcrypt";
import { validateUser } from "../validators/user.validator";

export const SignInRouter = (secret) => {
  const router = Router();

  router.post("/auth/user", async (req, res) => {
    try {
      const result = validateUser(req.body);

      if (result.error) {
        return res
          .status(StatusCode.ClientErrorBadRequest)
          .send(result.error.message);
      }

      const user = await userModel.findOne({
        email: req.body.email,
      });

      if (!user) {
        return res
          .status(StatusCode.ClientErrorNotFound)
          .send("invalid email or password");
      }

      if (!compareSync(req.body.password, user.password)) {
        return res
          .status(StatusCode.ClientErrorUnauthorized)
          .send("invalid email or password");
      }

      const token = jsonWebtoken.default.sign(
        { email: user.email, id: user.id },
        secret,
        { expiresIn: "1d" }
      );
      res
        .cookie("token", token, {
          secure: true,
          sameSite: "none",
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 24 * 3600000),
          maxAge: 86400000,
        })
        .json(user);
    } catch (error) {
      console.error(error);
      return res.status(StatusCode.ServerErrorInternal).send("internal error");
    }
  });

  return router;
};
