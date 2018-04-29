import { BuildingResourceEntity } from '../entities/building-resource.entity';

export const mapBuildingResources = (resources: BuildingResourceEntity[]) =>
  resources.map(item => ({
    id: item.resource.id,
    amount: item.amount,
  }));
