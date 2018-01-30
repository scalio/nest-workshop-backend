import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ResourceEntity } from '../../resources/entities/resource.entity';
import { UserEntity } from './user.entity';
import { InsufficientUserResourceException } from '../exceptions/insufficient-resource.exception';

@Entity()
export class UserResourceEntity {
  @PrimaryGeneratedColumn() readonly id: number;

  @ManyToOne(type => UserEntity)
  user: UserEntity;

  @ManyToOne(type => ResourceEntity, { eager: true })
  resource: ResourceEntity;

  @Column() amount: number;

  isEnough(amount: number): boolean {
    return this.amount >= amount;
  }

  use(amount: number) {
    if (this.amount < amount) {
      throw new InsufficientUserResourceException();
    }
    this.amount -= amount;
  }

  add(amount: number) {
    this.amount += amount;
  }
}
