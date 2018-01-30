import { Component, BadRequestException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { BuildingsService } from '../buildings/buildings.service';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';

@Component()
export class MeService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly buildingsService: BuildingsService,
  ) {}

  async buildById(user: UserEntity, buildingId: number): Promise<UserEntity> {
    const building = await this.buildingsService.findOne({ id: buildingId });
    if (!user.tryBuild(building)) {
      throw new BadRequestException();
    }
    return await this.usersRepository.save(user);
  }
}
