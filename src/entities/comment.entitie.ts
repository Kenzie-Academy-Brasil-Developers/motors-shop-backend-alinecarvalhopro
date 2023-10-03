import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entitie";
import { Announcement } from "./announcement.entitie";

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  comment: string;

  @CreateDateColumn({ type: "date" })
  date: string;

  @ManyToOne(() => User, (User) => User.comments, { onDelete: "CASCADE" })
  user: User;

  @ManyToOne(() => Announcement, (Announcement) => Announcement.comments, {
    onDelete: "CASCADE",
  })
  announcement: Announcement;
}

export { Comment };
