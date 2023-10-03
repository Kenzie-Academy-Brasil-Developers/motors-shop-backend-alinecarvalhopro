import { Router } from "express";
import {
  announcementRequestSchema,
  announcementUpdateSchema,
} from "../schemas/announcement.schemas";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { announcementsController } from "../controllers";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import { ensureIsSeller } from "../middlewares/ensureIsSeller.middleware";

const announcementsRouter = Router();

announcementsRouter.post(
  "",
  ensureAuthMiddleware,
  ensureIsSeller,
  ensureDataIsValidMiddleware(announcementRequestSchema),
  (request, response) => {
    announcementsController.create(request, response);
  }
);

announcementsRouter.get("", (request, response) => {
  announcementsController.findAll(request, response);
});

announcementsRouter.get("/:id", (request, response) => {
  announcementsController.findOne(request, response);
});

announcementsRouter.get("/users/:id", (request, response) => {
  announcementsController.findByUser(request, response);
});

announcementsRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureDataIsValidMiddleware(announcementUpdateSchema),
  (request, response) => announcementsController.update(request, response)
);

announcementsRouter.delete("/:id", ensureAuthMiddleware, (request, response) =>
  announcementsController.remove(request, response)
);

export { announcementsRouter };
