import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ListController } from '@/modules/list/list.controller';
import { ListService } from '@/modules/list/list.service';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Module({
  imports: [HttpModule],
  controllers: [ListController],
  providers: [ListService, ExternalMarketService],
})
export class ListModule {}
