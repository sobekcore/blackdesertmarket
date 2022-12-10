import { Module } from '@nestjs/common';
import { ItemModule } from '@/modules/item/item.module';
import { ListModule } from '@/modules/list/list.module';
import { AppController } from '@/app.controller';
import { CoreModule } from '@/core.module';

@Module({
  imports: [CoreModule, ListModule, ItemModule],
  controllers: [AppController],
})
export class AppModule {}
