import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() readonly id: number;

  @Column() username: string;

  @Column() password: string;

  constructor(partialUser?: Partial<UserEntity>) {
    partialUser && Object.assign(this, partialUser);
  }
}
