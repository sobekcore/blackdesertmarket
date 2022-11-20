import { Module } from '@nestjs/common';
import { CoreModule } from '@/core.module';
import { ListModule } from '@/modules/list/list.module';
import { ItemModule } from '@/modules/item/item.module';
import { AppController } from '@/app.controller';

@Module({
  imports: [CoreModule, ListModule, ItemModule],
  controllers: [AppController],
})
export class AppModule {}
