import { ApiParamOptions } from '@nestjs/swagger';

export const MainCategoryParam: ApiParamOptions = {
  name: 'mainCategory',
  schema: {
    type: 'integer',
    minimum: 1,
    maximum: 85,
  },
};
