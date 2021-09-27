import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
  } from "typeorm";
import { CafeImages } from "./cafe.images.entity";
import { Coupons } from "./coupons.entity";
import { Menus } from "./menus.entity";
import { Users } from "./users.entity";
  @Entity()
  export class Cafes {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    phone: string;
  
    @Column()
    description: string;
  
    @Column()
    location: string;
  
    @ManyToOne((type) => Users, (users) => users.cafes, { onDelete: "CASCADE" })
    users!: number;

    @OneToMany((type) => Coupons, (coupons) => coupons.cafes, { cascade: true })
    coupons!: number;

    @OneToMany((type) => Menus, (menus) => menus.cafes, { cascade: true })
    menus!: number;

    @OneToMany((type) => CafeImages, (cafeImages) => cafeImages.cafes, { cascade: true })
    cafeImages!: number;
}