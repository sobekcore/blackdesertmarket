import { ApiParamOptions } from '@nestjs/swagger';

export const SubCategoryParam: ApiParamOptions = {
  name: 'subCategory',
  schema: {
    type: 'integer',
    minimum: 1,
    maximum: 24,
  },
};
