import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FindIconByIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;
}
