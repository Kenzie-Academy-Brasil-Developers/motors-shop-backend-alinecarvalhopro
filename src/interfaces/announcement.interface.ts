import { z } from "zod";
import {
  announcementRequestSchema,
  announcementResponseSchema,
  announcementSchema,
  announcementUpdateSchema,
} from "../schemas/announcement.schemas";
import { DeepPartial } from "typeorm";

type TAnnouncement = z.infer<typeof announcementSchema>;
type TAnnouncementRequest = z.infer<typeof announcementRequestSchema>;
type TAnnouncementResponse = z.infer<typeof announcementResponseSchema>;
type TAnnouncementUpdateSchema = z.infer<typeof announcementUpdateSchema>;
type TAnnouncementUpdateRequest = DeepPartial<TAnnouncementRequest>;

export {
  TAnnouncement,
  TAnnouncementRequest,
  TAnnouncementResponse,
  TAnnouncementUpdateSchema,
  TAnnouncementUpdateRequest,
};
