import { AnnouncementService } from "../services/announcement.service";
import { SessionService } from "../services/session.service";
import { UserServices } from "../services/user.services";
import { AnnouncementsController } from "./announcement.controllers";
import { SessionController } from "./session.controller";
import { UsersController } from "./users.controllers";

const userServices = new UserServices();
const sessionService = new SessionService();
const announcementService = new AnnouncementService()
const usersController = new UsersController(userServices);
const sessionController = new SessionController(sessionService);
const announcementsController = new AnnouncementsController(announcementService);

export { usersController, sessionController, announcementsController };
