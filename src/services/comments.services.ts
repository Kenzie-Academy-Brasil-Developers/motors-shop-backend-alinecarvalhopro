import { AppDataSource } from "../data-source";
import { Announcement } from "../entities/announcement.entitie";
import { Comment } from "../entities/comment.entitie";
import { User } from "../entities/user.entitie";
import { AppError } from "../errors/appError";
import { TCommentRequest } from "../interfaces/comments.interface";
import { commentRequestUpdateSchema } from "../schemas/comments.schemas";
export class CommentService {
  async create(
    data: TCommentRequest,
    userId: string,
    announcementId: string
  ): Promise<void> {
    const userRepository = AppDataSource.getRepository(User);
    const announcementRepository = AppDataSource.getRepository(Announcement);
    const commentRepository = AppDataSource.getRepository(Comment);

    const user = await userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }

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

    let newComment = commentRepository.create({
      comment: data.comment,
      announcement: announcement,
      user: user,
    });

    await commentRepository.save(newComment);

    announcement.comments.push(newComment);
    await announcementRepository.save(announcement);
  }

  async list(announcementId: string) {
    const commentRepository = AppDataSource.getRepository(Comment);
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
      return { message: "Announcement not found", status: 404 };
    }

    const comments = await commentRepository.find({
      where: {
        announcement: {
          id: announcementId,
        },
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          description: true,
          seller: true,
          birth: true,
          cpf: true,
          email: true,
          phone_number: true,
          address: {
            cep: true,
            city: true,
            complement: true,
            id: true,
            number: true,
            state: true,
            street: true,
          },
        },
      },
    });

    if (comments.length == 0) {
      return { message: "Comment not found", status: 404 };
    }

    return comments;
  }

  async update(commentId: string, data: TCommentRequest) {
    const commentRepository = AppDataSource.getRepository(Comment);
    const announcementRepository = AppDataSource.getRepository(Announcement);

    const announcement = await announcementRepository.findOne({
      where: {
        comments: {
          id: commentId,
        },
      },
      relations: {
        comments: true,
      },
    });
    if (!announcement) {
      return { message: "Announcement not found", status: 404 };
    }

    const comment: Comment = await commentRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      return { message: "Comment not found", status: 404 };
    }

    comment.comment = data.comment;

    const updatedComment = await commentRepository.save(comment);
    announcement.comments.push(updatedComment);

    const returnData = commentRequestUpdateSchema.parse(updatedComment);

    return {
      message: returnData,
      status: 200,
    };
  }

  async remove(commentId: string): Promise<void> {
    const commentRepository = AppDataSource.getRepository(Comment);
    const comment: Comment = await commentRepository.findOne({
      where: {
        id: commentId,
      },
    });

    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    await commentRepository.remove(comment);
  }
}
