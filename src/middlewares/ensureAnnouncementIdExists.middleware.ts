import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/appError";
import { Announcement } from "../entities/announcement.entitie";

const ensureAnnoucementIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const announcementId = request.params.id;
  const announcementRepository = AppDataSource.getRepository(Announcement);

  const announcement = await announcementRepository.findOne({
    where: {
      id: announcementId,
    },
    relations: {
      comments: true,
    },
  });
  if (!announcement) {
    throw new AppError("Announcement not found", 404);
  }

  return next();
};

export default ensureAnnoucementIdExists;
