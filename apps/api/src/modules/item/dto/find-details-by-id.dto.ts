import { IsNotEmpty, IsOptional, IsString, IsNumber, IsIn, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FindDetailsByIdDTOParams {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(20)
  public readonly enhancement: number;
}

export class FindDetailsByIdDTOQuery {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
