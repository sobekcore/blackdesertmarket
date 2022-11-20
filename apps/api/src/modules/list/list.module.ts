import { Module } from '@nestjs/common';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ListController } from '@/modules/list/list.controller';
import { ListService } from '@/modules/list/list.service';
import { ItemService } from '@/modules/item/item.service';

@Module({
  imports: [ExternalMarketModule],
  controllers: [ListController],
  providers: [ListService, ItemService],
})
export class ListModule {}
