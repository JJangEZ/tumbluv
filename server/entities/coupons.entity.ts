import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Cafes } from "./cafes.entity"
import { Users } from "./users.entity";
@Entity()
export class Coupons {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default : 0 })
  count: number

  @ManyToOne((type) => Cafes, (cafes) => cafes.coupons, { onDelete: "CASCADE" })
  cafes: number;

  @ManyToOne((type) => Users, (users) => users.coupons, { onDelete: "CASCADE" })
  users: number;
}
