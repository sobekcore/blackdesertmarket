import { RegionCode } from '@/enums/region.enum';
import { RegionContext } from '@/contexts/region.context';

export function mockRegionContext(): RegionContext {
  return new RegionContext(RegionCode.EUROPE);
}
