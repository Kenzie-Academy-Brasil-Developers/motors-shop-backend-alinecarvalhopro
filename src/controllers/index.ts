import { AnnouncementService } from "../services/announcement.service";
import { CommentService } from "../services/comments.services";
import { SessionService } from "../services/session.service";
import { UserServices } from "../services/user.services";
import { AnnouncementsController } from "./announcement.controllers";
import { CommentController } from "./comment.controllers";
import { SessionController } from "./session.controller";
import { UsersController } from "./users.controllers";

const userServices = new UserServices();
const sessionService = new SessionService();
const announcementService = new AnnouncementService();
const commentsService = new CommentService();
const usersController = new UsersController(userServices);
const sessionController = new SessionController(sessionService);
const announcementsController = new AnnouncementsController(
  announcementService
);
const commentsController = new CommentController(commentsService);

export {
  usersController,
  sessionController,
  announcementsController,
  commentsController,
};
