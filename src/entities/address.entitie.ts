import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entitie";

@Entity("addresses")
class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 2 })
  state: string;

  @Column({ length: 30 })
  city: string;

  @Column({ length: 100 })
  street: string;

  @Column({ length: 8 })
  number: string;

  @Column({ length: 50 })
  complement: string;

  @OneToOne(() => User, (User) => User.address,  {
    onDelete: "CASCADE",
})
  @JoinColumn()
  user: User;
}

export { Address };
