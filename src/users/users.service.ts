import { Component, Inject, NotFoundException } from '@nestjs/common';
import { USERS_TOKEN } from './users.constants';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { CryptoService } from '../crypto/crypto.service';

@Component()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly cryptoService: CryptoService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(conditions: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.usersRepository.findOne(conditions);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = new UserEntity({
      ...userDto,
      password: await this.cryptoService.hash(userDto.password),
    });
    return await this.usersRepository.save(user);
  }
}
