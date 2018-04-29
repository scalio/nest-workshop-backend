import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from './../src/users/entities/user.entity';
import { BuildingEntity } from '../src/buildings/entities/building.entity';
import { UserResourceEntity } from '../src/users/entities/user-resource.entity';
import { ResourceEntity } from '../src/resources/entities/resource.entity';
import { CryptoService } from '../src/crypto/crypto.service';

export class UsersSeed1526479679620 implements MigrationInterface {
  private readonly users = require('./../fixtures/users.json');

  public async up(queryRunner: QueryRunner): Promise<any> {
    const { connection } = queryRunner;

    const cryptoService = new CryptoService();
    const usersRepository = connection.getRepository<UserEntity>(UserEntity);
    const buildingsRepository = connection.getRepository<BuildingEntity>(
      BuildingEntity,
    );
    const resourcesRepository = connection.getRepository<ResourceEntity>(
      ResourceEntity,
    );

    await Promise.all(
      this.users.map(async user => {
        const userEntity = new UserEntity();

        userEntity.username = user.username;
        userEntity.password = await cryptoService.hash(user.password);
        userEntity.buildings = user.buildings.map(id =>
          buildingsRepository.findOne(id),
        );

        userEntity.resources = (await Promise.all(
          user.resources.map(async item => {
            const userResource = new UserResourceEntity();
            userResource.amount = item.amount;
            userResource.resource = await resourcesRepository.findOne(
              item.id,
            );
            userResource.user = userEntity;
            return userResource;
          }),
        )) as any;

        await usersRepository.save(userEntity);
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const { connection } = queryRunner;
    const usersRepository = connection.getRepository<UserEntity>(UserEntity);
    const userResourceRepository = connection.getRepository<UserResourceEntity>(
      UserResourceEntity,
    );

    await userResourceRepository.clear();
    await usersRepository.clear();
  }
}
