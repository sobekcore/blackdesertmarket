import { IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FindByCategoryDTOParams {
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
