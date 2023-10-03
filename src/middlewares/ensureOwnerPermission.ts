import { NextFunction, Request, Response } from "express";
import { Comment } from "../entities/comment.entitie";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors/appError";

const ensureOwnerPermission = async (
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

  if (userId !== comment.user.id) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureOwnerPermission;
