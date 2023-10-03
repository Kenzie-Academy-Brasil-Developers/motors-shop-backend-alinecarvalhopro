import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  commentRequestSchema,
  commentRequestUpdateSchema,
} from "../schemas/comments.schemas";
import { commentsController } from "../controllers";
import ensureSellerOrOwnerPermission from "../middlewares/ensureSellerOrOwner";

export const commentsRouter: Router = Router();

commentsRouter.use(ensureAuthMiddleware);

commentsRouter.post(
  "/announcements/:id",
  ensureDataIsValidMiddleware(commentRequestSchema),
  (request, response) => {
    commentsController.create(request, response);
  }
);

commentsRouter.get("/announcements/:id", (request, response) => {
  commentsController.list(request, response);
});

commentsRouter.patch(
  "/:id",
  ensureDataIsValidMiddleware(commentRequestUpdateSchema),
  (request, response) => {
    commentsController.update(request, response);
  }
);

commentsRouter.delete(
  "/:id",
  ensureSellerOrOwnerPermission,
  (request, response) => {
    commentsController.remove(request, response);
  }
);
