import { MigrationInterface, QueryRunner } from 'typeorm';
import { BuildingEntity } from './../src/buildings/entities/building.entity';
import { BuildingResourceEntity } from '../src/buildings/entities/building-resource.entity';
import { ResourceEntity } from '../src/resources/entities/resource.entity';

export class BuildingsSeed1516485315355 implements MigrationInterface {
  private readonly buildings = require('./../fixtures/buildings.json');

  public async up(queryRunner: QueryRunner): Promise<any> {
    const { connection } = queryRunner;
    const buildingsRepository = connection.getRepository<BuildingEntity>(
      BuildingEntity,
    );
    const resourcesRepository = connection.getRepository<ResourceEntity>(
      ResourceEntity,
    );

    await Promise.all(
      this.buildings.map(async building => {
        const buildingEntity = new BuildingEntity();
        buildingEntity.name = building.name;

        buildingEntity.resources = (await Promise.all(
          building.resources.map(async item => {
            const buildingResource = new BuildingResourceEntity();
            buildingResource.amount = item.amount;
            buildingResource.resource = await resourcesRepository.findOne(
              item.id,
            );
            buildingResource.building = buildingEntity;
            return buildingResource;
          }), 
        )) as any;
        await buildingsRepository.save(buildingEntity);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const { connection } = queryRunner;
    const buildingsRepository = connection.getRepository<BuildingEntity>(
      BuildingEntity,
    );
    await buildingsRepository.clear();
  }
}