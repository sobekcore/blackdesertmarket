import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FindTypesByIdDTOParams {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;
}

export class FindTypesByIdDTOQuery {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
