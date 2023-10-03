import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError";
import { Comment } from "../entities/comment.entitie";
import { AppDataSource } from "../data-source";

const ensureSellerOrOwnerPermission = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const commentId: string = request.params.id;
  const userId: string = response.locals.userId;
  const commentRepository = AppDataSource.getRepository(Comment);

  const comment: Comment = await commentRepository.findOne({
    where: {
      id: commentId,
    },
    relations: {
      user: true,
      announcement: true,
    },
    select: {
      announcement: {
        user: {
          id: true,
        },
      },
    },
  });

  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  if (userId === comment.user.id) {
    return next();
  }

  if (userId === comment.announcement.user.id) {
    return next();
  }

  throw new AppError("Insufficient permission", 403);
};

export default ensureSellerOrOwnerPermission;
