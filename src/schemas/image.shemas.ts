import { z } from "zod";
import { announcementResponseSchema } from "./announcement.schemas";

const imageSchema = z.object({
  id: z.string(),
  url: z.string().max(200),
  announcement: announcementResponseSchema,
});

const imageRequestSchema = imageSchema.omit({
  id: true,
  announcement: true,
});

export { imageSchema, imageRequestSchema };

