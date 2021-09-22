import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
  } from "typeorm";
import { Cafes } from "./cafes.entity";
  import { Coupons } from "./coupons.entity";
  @Entity()
  export class Users {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    type: number;
  
    @Column()
    password: string;
  
    @Column()
    email: string;
  
    @Column()
    nickname: number;
  
    @OneToMany((type) => Coupons, (coupons) => coupons.users, { cascade: true })
    coupons!: number;

    @OneToMany((type) => Cafes, (cafes) => cafes.users, { cascade: true })
    cafes!: number;
}