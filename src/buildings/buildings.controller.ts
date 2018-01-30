import { Get, Controller } from '@nestjs/common';
import { BuildingEntity } from './entities/building.entity';
import { BuildingsService } from './buildings.service';

@Controller('buildings')
export class BuildingsController {
  constructor(private readonly buildingsService: BuildingsService) {}

  @Get()
  async findAll(): Promise<BuildingEntity[]> {
    return await this.buildingsService.findAll();
  }
}
