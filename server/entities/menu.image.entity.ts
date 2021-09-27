import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from "typeorm";
import { Menus } from "./menus.entity";
  @Entity()
  export class MenuImages {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    image: string;
  
    @ManyToOne((type) => Menus, (menus) => menus.menuImages, { onDelete: "CASCADE" })
    menus!: number;
}