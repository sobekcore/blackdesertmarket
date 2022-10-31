import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { files, configuration } from '@/configuration';
import { AppController } from '@/app.controller';
import { ListModule } from '@/modules/list/list.module';
import { ItemModule } from '@/modules/item/item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: files,
      load: [configuration],
    }),
    ListModule,
    ItemModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
