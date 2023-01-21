import { Module } from '@nestjs/common';
import { BdoCodexModule } from '@/modules/bdo-codex/bdo-codex.module';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';
import { ItemController } from '@/modules/item/item.controller';
import { ItemService } from '@/modules/item/item.service';

@Module({
  imports: [ExternalMarketModule, BdoCodexModule],
  controllers: [ItemController],
  providers: [ItemService, ItemValidatorService, ItemTransformerService],
})
export class ItemModule {}
