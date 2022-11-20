import { Module } from '@nestjs/common';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemController } from '@/modules/item/item.controller';
import { ItemService } from '@/modules/item/item.service';

@Module({
  imports: [ExternalMarketModule],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
