import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BdoCodexScraperService } from '@/modules/bdo-codex/bdo-codex-scraper.service';
import { BdoCodexService } from '@/modules/bdo-codex/bdo-codex.service';

@Module({
  imports: [HttpModule],
  providers: [BdoCodexService, BdoCodexScraperService],
  exports: [BdoCodexService, BdoCodexScraperService],
})
export class BdoCodexModule {}
