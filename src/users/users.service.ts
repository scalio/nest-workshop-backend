import { Component, Inject } from '@nestjs/common';
import { USERS_TOKEN } from './users.constants';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Component()
export class UsersService {
  private readonly users: User[] = require('./../../fixtures/users.json');

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: number): User | null {
    return this.users.find(item => item.id === id);
  }

  create(userDto: CreateUserDto): User {
    const randomId = Math.floor(Math.random() * 1000);
    const user = { ...userDto, id: randomId };
    this.users.push(user);
    return user;
  }
}
