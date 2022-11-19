import { Module } from '@nestjs/common';
import { ListController } from '@/modules/list/list.controller';
import { ListService } from '@/modules/list/list.service';
import { ItemService } from '@/modules/item/item.service';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';

@Module({
  imports: [ExternalMarketModule],
  controllers: [ListController],
  providers: [ListService, ItemService],
})
export class ListModule {}
