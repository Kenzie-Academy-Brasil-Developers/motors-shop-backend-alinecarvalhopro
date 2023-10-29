import { Router } from "express";
import { usersController } from "../controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { userRequestSchema, userUdpateSchema } from "../schemas/user.schemas";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import ensureUniqueEmail from "../middlewares/ensureUniqueEmail.middleware";
import ensureUniqueCpf from "../middlewares/ensureUniqueCpf.middleware";
import ensureUserIdExists from "../middlewares/ensureUserIdExists.middleware";

const userRouter = Router();
userRouter.post(
  "",
  ensureUniqueEmail,
  ensureUniqueCpf,
  ensureDataIsValidMiddleware(userRequestSchema),
  (request, response) => {
    usersController.create(request, response);
  }
);

userRouter.get("/:id", ensureUserIdExists, (request, response) => {
  usersController.getById(request, response);
});

userRouter.use("/:id", ensureAuthMiddleware);

userRouter.patch(
  "/:id",
  ensureUserIdExists,
  ensureUniqueEmail,
  ensureUniqueCpf,
  ensureDataIsValidMiddleware(userUdpateSchema),
  (request, response) => {
    usersController.update(request, response);
  }
);

userRouter.delete("/:id", ensureUserIdExists, (request, response) => {
  usersController.delete(request, response);
});

export { userRouter };
