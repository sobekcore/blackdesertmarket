import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FindIconByIdDTOParams {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;
}
