import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { I18nModule, QueryResolver } from 'nestjs-i18n';
import { join } from 'path';
import { config, files } from '@/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: files,
      load: [config],
    }),
    I18nModule.forRootAsync({
      inject: [ConfigService],
      resolvers: [new QueryResolver(['language'])],
      useFactory: async (configService: ConfigService) => ({
        fallbackLanguage: configService.get('defaultRequestLanguage'),
        loaderOptions: {
          path: join(__dirname, 'i18n'),
          watch: true,
        },
      }),
    }),
  ],
})
export class CoreModule {}
