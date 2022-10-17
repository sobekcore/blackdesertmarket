import { IsNotEmpty, IsOptional, IsString, IsNumber, Max, Min } from 'class-validator';
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

export class FindByCategoryDTOQuery {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
