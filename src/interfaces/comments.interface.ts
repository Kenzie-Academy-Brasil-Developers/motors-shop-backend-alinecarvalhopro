import { z } from "zod";
import {
  commentRequestSchema,
  commentRequestUpdateSchema,
  commentResponseSchema,
  commentSchema,
} from "../schemas/comments.schemas";

type TComment = z.infer<typeof commentSchema>;
type TCommentRequest = z.infer<typeof commentRequestSchema>;
type TCommentResponse = z.infer<typeof commentResponseSchema>;
type TCommentUpdateSchema = z.infer<typeof commentRequestUpdateSchema>;

export { TComment, TCommentRequest, TCommentResponse, TCommentUpdateSchema };
