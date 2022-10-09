import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalMarketService } from '@/modules/external-market/external-market.service';

@Module({
  imports: [HttpModule],
  providers: [ExternalMarketService],
})
export class ListModule {}
