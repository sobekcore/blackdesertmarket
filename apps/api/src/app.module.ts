import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ItemModule } from '@/modules/item/item.module';
import { ListModule } from '@/modules/list/list.module';

@Module({
  imports: [ItemModule, ListModule],
  controllers: [AppController],
})
export class AppModule {}
