import { Module } from '@nestjs/common';
import { ItemModule } from '@/modules/item/item.module';
import { ListModule } from '@/modules/list/list.module';
import { SearchModule } from '@/modules/search/search.module';
import { AppController } from '@/app.controller';
import { CoreModule } from '@/core.module';

@Module({
  imports: [CoreModule, ListModule, ItemModule, SearchModule],
  controllers: [AppController],
})
export class AppModule {}
