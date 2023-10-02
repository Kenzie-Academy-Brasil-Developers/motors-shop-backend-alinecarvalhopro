import { z } from "zod";
import { imageRequestSchema } from "./image.shemas";
import { commentSchema } from "./comments.schemas";
import { userSchemaResponseCreateAnnouncement } from "./user.schemas";

const announcementSchema = z.object({
  id: z.string(),
  brand: z.string().max(30),
  model: z.string().max(50),
  year: z.string().length(4),
  mileage: z.number().int(),
  color: z.string().max(15),
  fuel: z.string().max(15),
  list_price: z.number().positive().or(z.string()),
  price: z.number().positive().or(z.string()),
  description: z.string(),
  user: userSchemaResponseCreateAnnouncement,
  images: z.array(imageRequestSchema),
  comments: z.array(commentSchema),
});

const announcementSchemaToUpdate = z.object({
  id: z.string(),
  brand: z.string().max(30),
  model: z.string().max(50),
  year: z.string().length(4),
  mileage: z.number().int(),
  color: z.string().max(15),
  fuel: z.string().max(15),
  list_price: z.number().positive().or(z.string()),
  price: z.number().positive().or(z.string()),
  description: z.string(),
  user: userSchemaResponseCreateAnnouncement,
  images: z.array(imageRequestSchema),
  comments: z.array(commentSchema),
});

const announcementSchemaRead = z.object({
  id: z.string(),
  brand: z.string().max(30),
  model: z.string().max(50),
  year: z.string().length(4),
  mileage: z.number().int(),
  color: z.string().max(15),
  fuel: z.string().max(15),
  list_price: z.number().positive().or(z.string()),
  price: z.number().positive().or(z.string()),
  description: z.string(),
  user: userSchemaResponseCreateAnnouncement,
  images: z.array(imageRequestSchema),
  comments: z.array(commentSchema),
});

const announcementRequestSchema = announcementSchema.omit({
  id: true,
  user: true,
  comments: true,
});

const announcementResponseSchema = announcementSchema.omit({
  comments: true,
});

const announcementResponseSchemaReadArray = announcementSchemaRead.array();

const announcementUpdateSchema = announcementRequestSchema.partial();

const announcementUpdateSchemaPartial = announcementSchemaToUpdate.partial();

export {
  announcementSchema,
  announcementRequestSchema,
  announcementResponseSchema,
  announcementUpdateSchema,
  announcementUpdateSchemaPartial,
  announcementSchemaToUpdate,
  announcementSchemaRead,
  announcementResponseSchemaReadArray
};
