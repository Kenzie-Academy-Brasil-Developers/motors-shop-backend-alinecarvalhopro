import { Request, Response } from "express";
import { TCommentRequest } from "../interfaces/comments.interface";
import { CommentService } from "../services/comments.services";

export class CommentController {
  constructor(private commentService: CommentService) {}

  async create(request: Request, response: Response) {
    const userId = response.locals.userId;
    const comment = await this.commentService.create(
      request.body as TCommentRequest,
      userId,
      request.params.id
    );
    return response.status(201).json(comment);
  }

  async list(request: Request, response: Response) {
    const announcementId = request.params.id;
    const comments = await this.commentService.list(announcementId);
    response.status(200).json(comments);
  }

  async update(request: Request, response: Response) {
    const commentId = request.params.id;
    const newData: TCommentRequest = request.body;

    const { message, status } = await this.commentService.update(
      commentId,
      newData
    );
    response.status(status).json({ message });
  }

  async remove(request: Request, response: Response): Promise<Response> {
    const commentId: string = request.params.id;
    await this.commentService.remove(commentId);
    return response.status(204).send();
  }
}
