import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entitie";
import { Image } from "./image.entitie";
import { Comment } from "./comment.entitie";

@Entity("announcements")
class Announcement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 30 })
  brand: string;

  @Column({ length: 50 })
  model: string;

  @Column({ length: 4})
  year: string;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ length: 15 })
  color: string;

  @Column({ length: 15 })
  fuel: string;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  list_price: number;

  @Column({ type: "decimal", precision: 8, scale: 2 })
  price: number;

  @Column({ type: "text" })
  description: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Image, (image) => image.announcement)
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.announcement)
  comments: Comment[];
}

export { Announcement };
