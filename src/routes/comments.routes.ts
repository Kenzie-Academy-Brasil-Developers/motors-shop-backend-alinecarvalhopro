import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import {
  commentRequestSchema,
  commentRequestUpdateSchema,
} from "../schemas/comments.schemas";
import { commentsController } from "../controllers";
import ensureSellerOrOwnerPermission from "../middlewares/ensureSellerOrOwner";
import ensureAnnoucementIdExists from "../middlewares/ensureAnnouncementIdExists.middleware";

export const commentsRouter: Router = Router();

commentsRouter.use(ensureAuthMiddleware);

commentsRouter.post(
  "/announcements/:id",
  ensureAnnoucementIdExists,
  ensureDataIsValidMiddleware(commentRequestSchema),
  (request, response) => {
    commentsController.create(request, response);
  }
);

commentsRouter.get(
  "/announcements/:id",
  ensureAnnoucementIdExists,
  (request, response) => {
    commentsController.list(request, response);
  }
);

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
