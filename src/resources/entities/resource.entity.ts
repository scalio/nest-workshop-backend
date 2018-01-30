import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class ResourceEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() name: string;
}
