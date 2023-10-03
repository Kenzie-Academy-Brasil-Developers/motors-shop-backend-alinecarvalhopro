import { AppDataSource } from "../data-source";
import {
  TAnnouncementRequest,
  TAnnouncementResponse,
  TAnnouncementUpdateSchema,
} from "../interfaces/announcement.interface";
import { Announcement } from "../entities/announcement.entitie";
import { User } from "../entities/user.entitie";
import { TImageRequest } from "../interfaces/image.interface";
import { Image } from "../entities/image.entitie";
import {
  announcementResponseSchema,
  announcementUpdateSchemaPartial,
} from "../schemas/announcement.schemas";
import { AppError } from "../errors/appError";

export class AnnouncementService {
  async create(
    data: TAnnouncementRequest,
    userId: string
  ): Promise<TAnnouncementResponse> {
    const announcementRepository = AppDataSource.getRepository(Announcement);
    const userRepository = AppDataSource.getRepository(User);
    const imageRepository = AppDataSource.getRepository(Image);

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const announcement: Announcement = announcementRepository.create({
      brand: data.brand,
      color: data.color,
      description: data.description,
      fuel: data.fuel,
      list_price: data.list_price,
      price: data.price,
      mileage: data.mileage,
      model: data.model,
      year: data.year,
      user,
    });

    await announcementRepository.save(announcement);

    const images: TImageRequest[] = data.images || [];
    if (images.length > 0) {
      for await (let image of images) {
        const imageUrl = imageRepository.create({
          url: image.url,
          announcement: announcement,
        });
        imageRepository.save(imageUrl);
      }
    }

    const findAnnouncements = await announcementRepository.findOne({
      where: {
        id: announcement.id,
      },
      relations: {
        images: true,
        user: true,
      },
    });

    const returnData = { ...findAnnouncements, images };

    return announcementResponseSchema.parse(returnData);
  }

  async findAll(): Promise<TAnnouncementResponse[]> {
    const announcementRepository = AppDataSource.getRepository(Announcement);
    const returnData = await announcementRepository.find({
      relations: {
        comments: true,
        images: true,
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

    return returnData;
  }

  async findOne(id: string): Promise<TAnnouncementResponse> {
    const announcementRepository = AppDataSource.getRepository(Announcement);
    const announcement = await announcementRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        user: true,
        comments: true,
        images: true,
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

    if (!announcement) {
      return { message: "Announcement not found", status: 404 };
    }

    return { message: announcement, status: 200 };
  }

  async findByUser(userId: string) {
    const announcementRepository = AppDataSource.getRepository(Announcement);

    const userRepository = AppDataSource.getRepository(User);
    const findUser = await userRepository.findOne({
      where: {
        id: userId,
      },
      select: {
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
    });

    if (!findUser) {
      return { message: "User not found", status: 404 };
    }

    const announcements = await announcementRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        user: true,
        comments: true,
        images: true,
      },
      select: {
        user: {
          id: true,
          name: true,
          description: true,
          seller: true,
        },
      },
    });

    if (!announcements) {
      return { message: "Announcement not found", status: 404 };
    }

    return {
      message: announcements,
      status: 200,
    };
  }

  async update(
    data: TAnnouncementUpdateSchema,
    announcementId: string
  ): Promise<TAnnouncementResponse> {
    const announcementRepository = AppDataSource.getRepository(Announcement);
    const oldAnnouncement = await announcementRepository.findOneBy({
      id: announcementId,
    });

    if (!oldAnnouncement) {
      throw new AppError("Announcement not found", 404);
    }

    const newAnnouncementData = announcementRepository.create({
      ...oldAnnouncement,
      ...data,
    });

    await announcementRepository.save(newAnnouncementData);

    let returnData = announcementUpdateSchemaPartial.parse(newAnnouncementData);
    returnData.list_price = Number(returnData.list_price).toFixed(2).toString();
    returnData.price = Number(returnData.price).toFixed(2).toString();
    return returnData;
  }

  async remove(announcementId: string) {
    const announcementRepository = AppDataSource.getRepository(Announcement);
    const announcement = await announcementRepository.findOneBy({
      id: announcementId,
    });

    if (!announcement) {
      throw new AppError("Announcement not found", 404);
    }

    await announcementRepository.remove(announcement);
  }
}
