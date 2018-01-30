/*import { MigrationInterface, QueryRunner } from 'typeorm';
import { ResourceEntity } from './../src/resources/entities/resource.entity';

export class ResourcesSeed1516485308529 implements MigrationInterface {
  private readonly resources = require('./../fixtures/resources.json');

  public async up(queryRunner: QueryRunner): Promise<any> {
    const { connection } = queryRunner;
    const resourcesRepository = connection.getRepository<ResourceEntity>(ResourceEntity);
    
    await Promise.all(
      this.resources.map(async resource => {
        const resourceEntity = new ResourceEntity();
        resourceEntity.name = resource.name;
        await resourcesRepository.save(resourceEntity);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const { connection } = queryRunner;
    const resourcesRepository = connection.getRepository<ResourceEntity>(ResourceEntity);
    await resourcesRepository.clear();
  }
}
*/