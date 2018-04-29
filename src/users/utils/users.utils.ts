import { UserResourceEntity } from '../entities/user-resource.entity';
import { BuildingEntity } from '../../buildings/entities/building.entity';

export const mapUserResources = (resources: UserResourceEntity[]) =>
  resources.map(item => ({
    id: item.resource.id,
    amount: item.amount,
  }));

export const mapUserBuildings = (buildings: BuildingEntity[]) =>
  buildings.map(item => item.id);
