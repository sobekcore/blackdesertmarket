import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ListModule } from '@/modules/list/list.module';
import { ItemModule } from '@/modules/item/item.module';

@Module({
  imports: [ListModule, ItemModule],
  controllers: [AppController],
})
export class AppModule {}
