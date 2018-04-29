import { Controller, Get } from '@nestjs/common';
import { ResourceEntity } from './entities/resource.entity';
import { ResourcesService } from './resources.service';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async findAll(): Promise<ResourceEntity[]> {
    return this.resourcesService.findAll();
  }
}
