import { Component, NotFoundException } from '@nestjs/common';
import { ResourceEntity } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Component()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourcesRepository: Repository<ResourceEntity>,
  ) {}

  async findAll(): Promise<ResourceEntity[]> {
    return await this.resourcesRepository.find();
  }
}
