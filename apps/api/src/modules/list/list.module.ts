import { Module } from '@nestjs/common';
import { BdoCodexModule } from '@/modules/bdo-codex/bdo-codex.module';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';
import { ListController } from '@/modules/list/list.controller';
import { ListService } from '@/modules/list/list.service';

@Module({
  imports: [ExternalMarketModule, BdoCodexModule],
  controllers: [ListController],
  providers: [ListService, ItemValidatorService, ItemTransformerService],
})
export class ListModule {}
