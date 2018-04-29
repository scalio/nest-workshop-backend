import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { CryptoService } from '../crypto/crypto.service';
import { ResourceWithAmount } from '../resources/interfaces/resource-with-amount.interface';

@Injectable()
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
    const password = await this.cryptoService.hash(userDto.password);
    const user = new UserEntity({ ...userDto, password });
    return await this.usersRepository.save(user);
  }

  async addResourceToUserById(
    userId: number,
    resourceWithAmount: ResourceWithAmount,
  ) {
    const user = await this.usersRepository.findOne({ id: userId });
    await user.addResource(resourceWithAmount);
    await this.usersRepository.save(user);
  }
}
