import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from "typeorm";
import { Cafes } from "./cafes.entity";
  @Entity()
  export class CafeImages {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    image: string;
  
    @ManyToOne((type) => Cafes, (cafes) => cafes.cafeImages, { onDelete: "CASCADE" })
    cafes!: number;
}