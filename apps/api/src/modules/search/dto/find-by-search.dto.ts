import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class FindBySearchParamsDto {
  @Type(() => String)
  @IsString()
  public readonly search: string;
}
