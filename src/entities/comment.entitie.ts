import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entitie";
import { Announcement } from "./announcement.entitie";

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  comment: string;

  @ManyToOne(() => User, (User) => User.comments, {})
  user: User;

  @ManyToOne(() => Announcement, (Announcement) => Announcement.comments, {})
  announcement: Announcement;
}

export { Comment };
