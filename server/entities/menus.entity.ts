import { Test } from "@nestjs/testing";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
  } from "typeorm";
import { Cafes } from "./cafes.entity";
import { MenuImages } from "./menu.image.entity";
  @Entity()
  export class Menus {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    menu: string;
  
    @Column()
    price: string;
  
    @Column()
    description: string;
  
    @ManyToOne((type) => Cafes, (cafes) => cafes.menus, { onDelete: "CASCADE" })
    cafes!: number;

    @OneToMany((type) => MenuImages, (menuImages) => menuImages.menus , { cascade: true })
    menuImages!: number;
}