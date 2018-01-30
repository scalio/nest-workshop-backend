import { IsInt } from 'class-validator';

export class BuildByIdDto {
  @IsInt() readonly id: number;
}
