import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindTooltipByIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  public readonly id: number;

  @Type(() => Number)
  @IsNumber()
  public readonly enhancement: number;
}
