import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

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

export class FindByCategoryQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
