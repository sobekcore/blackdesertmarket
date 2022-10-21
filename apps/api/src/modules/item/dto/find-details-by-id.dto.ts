import { IsNotEmpty, IsOptional, IsString, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class FindDetailsByIdDTOParams {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;

  @Type(() => Number)
  @IsNumber()
  @IsIn([0, 8, 11, 13, 16, 17, 18, 19, 20])
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
