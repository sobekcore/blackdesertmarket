import { Type } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class FindByCategoryParamsDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(85)
  public readonly mainCategory: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(24)
  public readonly subCategory: number;
}
