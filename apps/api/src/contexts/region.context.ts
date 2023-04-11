import { NotFoundException } from '@nestjs/common';
import { RegionCode, RegionName } from '@/enums/region.enum';

export class RegionContext {
  public readonly code: RegionCode;
  public readonly name: RegionName;

  constructor(region: RegionCode) {
    this.code = region;
    this.name = this.findRegionNameByRegionCode(region);
  }

  private findRegionNameByRegionCode(code: RegionCode): RegionName {
    const key: string = Object.keys(RegionCode).find((key: string): boolean => {
      return RegionCode[key] === code;
    });

    if (!key) {
      throw new NotFoundException(`Could not find region name for region code ${code}`);
    }

    return RegionName[key];
  }
}
