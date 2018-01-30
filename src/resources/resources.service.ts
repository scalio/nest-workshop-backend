import { Component, NotFoundException } from '@nestjs/common';
import { ResourceEntity } from './entities/resource.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceWithAmount } from './interfaces/resource-with-amount.interface';

@Component()
export class ResourcesService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourcesRepository: Repository<ResourceEntity>,
  ) {}

  async findAll(): Promise<ResourceEntity[]> {
    return await this.resourcesRepository.find();
  }

  async getRandomResource(): Promise<ResourceWithAmount> {
    const resources = await this.resourcesRepository.find();
    const index = Math.floor(Math.random() * resources.length);
    const randomResource = resources[index];
    return {
      amount: this.getRandomAmount(randomResource),
      resource: randomResource,
    };
  }

  getRandomAmount(resource: ResourceEntity): number {
    if (resource.name === 'Gold') {
      return Math.floor(Math.random() * 900) + 100;
    }
    return Math.floor(Math.random() * 2) + 1;
  }
}
