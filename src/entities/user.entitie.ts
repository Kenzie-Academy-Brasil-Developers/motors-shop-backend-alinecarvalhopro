import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address.entitie";
import { Announcement } from "./announcement.entitie";
import { Comment } from "./comment.entitie";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 120, unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 11 })
  phone_number: string;

  @Column({ type: "date" })
  birth: string;

  @Column({ type: "text" })
  description: string;

  @Column({ length: 120 })
  password: string;

  @Column({
    default: false,
  })
  seller: boolean;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcements: Announcement[];

  @OneToMany(() => Comment, (Comment) => Comment.user)
  comments: Comment[];
}

export { User };
