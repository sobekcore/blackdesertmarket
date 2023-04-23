import { Module } from '@nestjs/common';
import { ItemModule } from '@/modules/item/item.module';
import { ListModule } from '@/modules/list/list.module';
import { SearchModule } from '@/modules/search/search.module';
import { CoreModule } from '@/core.module';

@Module({
  imports: [CoreModule, ListModule, ItemModule, SearchModule],
})
export class AppModule {}
