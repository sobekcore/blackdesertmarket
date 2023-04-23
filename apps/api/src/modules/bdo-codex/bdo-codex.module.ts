import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { BdoCodexScraperService } from '@/modules/bdo-codex/bdo-codex-scraper.service';
import { BdoCodexService } from '@/modules/bdo-codex/bdo-codex.service';

@Module({
  imports: [HttpModule],
  providers: [BdoCodexService, BdoCodexScraperService, I18nContext],
  exports: [BdoCodexService, BdoCodexScraperService],
})
export class BdoCodexModule {}
