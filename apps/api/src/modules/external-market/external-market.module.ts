import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Module({
  imports: [HttpModule],
  providers: [ExternalMarketService],
  exports: [ExternalMarketService],
})
export class ExternalMarketModule {}
