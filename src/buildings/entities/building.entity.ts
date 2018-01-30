import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BuildingResourceEntity } from './building-resource.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Transform } from 'class-transformer';

@Entity()
export class BuildingEntity {
  @PrimaryGeneratedColumn() readonly id: number;

  @Column() name: string;

  @OneToMany(
    type => BuildingResourceEntity,
    buildingResource => buildingResource.building,
    {
      cascadeInsert: true,
      cascadeUpdate: true,
      eager: true,
    },
  )
  resources: BuildingResourceEntity[];
}
