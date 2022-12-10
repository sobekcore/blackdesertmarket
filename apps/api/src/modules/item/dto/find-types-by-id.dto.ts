import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindTypesByIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;
}

export class FindTypesByIdQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
