import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { BuildingEntity } from '../../buildings/entities/building.entity';
import { UserResourceEntity } from './user-resource.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() readonly id: number;

  @Column() username: string;

  @Column() password: string;

  @JoinTable()
  @ManyToMany(type => BuildingEntity, { eager: true })
  buildings: BuildingEntity[];

  @OneToMany(type => UserResourceEntity, userResource => userResource.user, {
    cascadeInsert: true,
    cascadeUpdate: true,
    eager: true,
  })
  resources: UserResourceEntity[];

  constructor(partialUser?: Partial<UserEntity>) {
    partialUser && Object.assign(this, partialUser);
  }

  tryBuild(building: BuildingEntity): boolean {
    const { resources: buildingResources } = building;
    try {
      buildingResources.forEach(({ resource, amount }) => {
        const userResource = this.findResourceById(resource.id);
        userResource && userResource.use(amount);
      });
      this.buildings.push(building);
      return true;
    } catch (e) {
      return false;
    }
  }

  findResourceById(id: number): UserResourceEntity | undefined {
    return this.resources.find(({ resource }) => resource.id === id);
  }
}
