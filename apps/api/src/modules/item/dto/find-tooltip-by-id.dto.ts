import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindTooltipByIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;

  @Type(() => Number)
  @IsNumber()
  public readonly enhancement: number;
}

export class FindTooltipByIdQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
