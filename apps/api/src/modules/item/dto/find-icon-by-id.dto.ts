import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindIconByIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;
}
