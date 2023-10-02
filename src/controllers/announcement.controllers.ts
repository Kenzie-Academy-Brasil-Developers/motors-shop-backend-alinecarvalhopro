import { Request, Response } from "express";
import { AnnouncementService } from "../services/announcement.service";
import { TAnnouncementRequest } from "../interfaces/announcement.interface";

export class AnnouncementsController {
  constructor(private announcementService: AnnouncementService) {}

  async create(request: Request, response: Response) {
    const userId = response.locals.userId;
    const newAnnouncement = await this.announcementService.create(
      request.body as TAnnouncementRequest,
      userId
    );
    response.status(201).json(newAnnouncement);
  }

  async findAll(request: Request, response: Response) {
    const announcements = await this.announcementService.findAll();
    response.status(200).json(announcements);
  }

  async findOne(request: Request, response: Response) {
    const id = request.params.id;
    const {message, status} = await this.announcementService.findOne(id);
    response.status(status).json({message});
  }

  async findByUser(request: Request, response: Response) {
    const userId = request.params.id;
    const {message, status} = await this.announcementService.findByUser(userId);
    return response.status(status).json({message});
  }

  async update(request: Request, response: Response) {
    const announcementId = request.params.id;
    const updateAnnouncement = await this.announcementService.update(
      request.body,
      announcementId
    );

    return response.json(updateAnnouncement);
  }

  async remove(request: Request, response: Response) {
    const announcementId = request.params.id;
    await this.announcementService.remove(announcementId);

    return response.status(204).send();
  }
}
