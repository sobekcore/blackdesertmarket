import { ApiQueryOptions } from '@nestjs/swagger';
import { LanguageCode } from '@/enums/language.enum';

export const LanguageQuery: ApiQueryOptions = {
  name: 'language',
  schema: {
    type: 'string',
    enum: Object.values(LanguageCode),
    default: LanguageCode.ENGLISH,
  },
  required: false,
};
