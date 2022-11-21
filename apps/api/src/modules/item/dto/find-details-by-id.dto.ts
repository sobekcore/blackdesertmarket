import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class FindDetailsByIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(20)
  public readonly enhancement: number;
}

export class FindDetailsByIdQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
