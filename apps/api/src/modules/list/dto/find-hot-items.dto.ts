import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindHotItemsQueryDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly region?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public readonly language?: string;
}
