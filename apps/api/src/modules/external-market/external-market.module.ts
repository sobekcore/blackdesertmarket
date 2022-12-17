import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalMarketAssetService } from '@/modules/external-market/external-market-asset.service';
import { ExternalMarketRawService } from '@/modules/external-market/external-market-raw.service';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Module({
  imports: [HttpModule],
  providers: [ExternalMarketService, ExternalMarketRawService, ExternalMarketAssetService],
  exports: [ExternalMarketService, ExternalMarketRawService, ExternalMarketAssetService],
})
export class ExternalMarketModule {}
