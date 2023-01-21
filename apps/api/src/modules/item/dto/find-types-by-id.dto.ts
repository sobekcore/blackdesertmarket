import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindTypesByIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;
}
