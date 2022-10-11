import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ListController } from '@/modules/list/list.controller';
import { ListService } from '@/modules/list/list.service';
import { ItemService } from '@/modules/item/item.service';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Module({
  imports: [HttpModule],
  controllers: [ListController],
  providers: [ListService, ItemService, ExternalMarketService],
})
export class ListModule {}
