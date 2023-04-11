import { Module } from '@nestjs/common';
import { BdoCodexModule } from '@/modules/bdo-codex/bdo-codex.module';
import { ExternalMarketModule } from '@/modules/external-market/external-market.module';
import { ItemTransformerService } from '@/modules/item/item-transformer.service';
import { ItemValidatorService } from '@/modules/item/item-validator.service';
import { SearchController } from '@/modules/search/search.controller';
import { SearchService } from '@/modules/search/search.service';

@Module({
  imports: [ExternalMarketModule, BdoCodexModule],
  controllers: [SearchController],
  providers: [SearchService, ItemValidatorService, ItemTransformerService],
})
export class SearchModule {}
