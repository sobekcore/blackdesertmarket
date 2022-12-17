import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

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
  @Transform(({ value }) => String(value) === 'true')
  @IsBoolean()
  @IsOptional()
  public readonly extended?: boolean;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
