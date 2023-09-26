import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./address.entitie";
import { Announcement } from "./announcement.entitie";

export enum AccountType {
  BUYER = "buyer",
  SALLER = "saller",
}

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  url: string;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Announcement, (announcement) => announcement.user)
  announcement: Announcement;
}

export { Image };
