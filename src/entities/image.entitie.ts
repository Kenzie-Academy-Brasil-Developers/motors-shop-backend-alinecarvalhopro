import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./announcement.entitie";

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  url: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.images, {
    onDelete: "CASCADE",
  })
  announcement: Announcement;
}

export { Image };
