import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BuildingResourceEntity } from './building-resource.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Transform } from 'class-transformer';
import { mapBuildingResources } from '../utils/buildings.utils';

@Entity()
export class BuildingEntity {
  @PrimaryGeneratedColumn() readonly id: number;

  @Column() name: string;

  @Transform(mapBuildingResources)
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
