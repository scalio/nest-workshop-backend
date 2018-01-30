import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { BuildingEntity } from './building.entity';
import { ResourceEntity } from '../../resources/entities/resource.entity';

@Entity()
export class BuildingResourceEntity {
  @PrimaryGeneratedColumn() readonly id: number;

  @ManyToOne(type => BuildingEntity)
  building: BuildingEntity;

  @ManyToOne(type => ResourceEntity, { eager: true })
  resource: ResourceEntity;

  @Column() amount: number;
}
