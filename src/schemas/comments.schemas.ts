import { z } from "zod";
import { announcementResponseSchema } from "./announcement.schemas";
import { userResponseSchema } from "./user.schemas";

const commentSchema = z.object({
  id: z.string(),
  comment: z.string(),
  user: userResponseSchema,
  announcement: announcementResponseSchema,
});

const commentRequestSchema = commentSchema.omit({
  id: true,
  user: true,
  announcement: true,
});

export { commentSchema, commentRequestSchema };
