import { ResourceEntity } from '../entities/resource.entity';

export interface ResourceWithAmount {
  resource: ResourceEntity;
  amount: number;
}
