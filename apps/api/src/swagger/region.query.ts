import { ApiQueryOptions } from '@nestjs/swagger';
import { RegionCode } from '@/enums/region.enum';

export const RegionQuery: ApiQueryOptions = {
  name: 'region',
  schema: {
    type: 'string',
    enum: Object.values(RegionCode),
  },
};
