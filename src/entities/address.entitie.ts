import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entitie";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 11 })
  cep: string;

  @Column({ length: 2 })
  description: string;

  @Column({ length: 30 })
  status: string;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 8 })
  number: string;

  @Column({ length: 50 })
  complement: string;

  @OneToOne(() => User)
  user: User;
}

export { Address };
