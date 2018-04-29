import { Injectable, NotFoundException } from '@nestjs/common';
import { BuildingEntity } from './entities/building.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BuildingsService {
  constructor(
    @InjectRepository(BuildingEntity)
    private readonly buildingsRepository: Repository<BuildingEntity>,
  ) {}

  async findOne(conditions: Partial<BuildingEntity>): Promise<BuildingEntity> {
    const building = await this.buildingsRepository.findOne(conditions);
    if (!building) {
      throw new NotFoundException();
    }
    return building;
  }

  async findAll(): Promise<BuildingEntity[]> {
    return await this.buildingsRepository.find();
  }
}
