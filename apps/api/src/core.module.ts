import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { files, configuration } from '@/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: files,
      load: [configuration],
    }),
  ],
})
export class CoreModule {}
