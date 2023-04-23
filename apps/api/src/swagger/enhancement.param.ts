import { ApiParamOptions } from '@nestjs/swagger';

export const EnhancementParam: ApiParamOptions = {
  name: 'enhancement',
  schema: {
    type: 'integer',
    minimum: 1,
    maximum: 20,
  },
};
