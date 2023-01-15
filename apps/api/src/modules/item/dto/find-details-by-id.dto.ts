import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

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
}
