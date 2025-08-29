import { Injectable } from '@nestjs/common';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { BdoCodexMeta, BdoCodexParams } from '@/interfaces/objects/bdo-codex.interface';
import { BdoCodexEndpoint, BdoCodexLanguageCode } from '@/enums/bdo-codex.enum';
import { LanguageCode } from '@/enums/language.enum';

@Injectable()
export class BdoCodexService {
  public readonly matchBdoCodexLanguage: Record<LanguageCode, BdoCodexLanguageCode> = {
    [LanguageCode.ENGLISH]: BdoCodexLanguageCode.ENGLISH,
    [LanguageCode.SPANISH]: BdoCodexLanguageCode.SPANISH,
  };

  public async buildRequest(endpoint: BdoCodexEndpoint, params: BdoCodexParams, meta: BdoCodexMeta): Promise<string> {
    const language: BdoCodexLanguageCode = this.matchBdoCodexLanguage[meta.language];

    const url: URL = this.getRequestUrl(endpoint);
    url.searchParams.append('l', language);

    for (const [key, value] of Object.entries(params)) {
      url.searchParams.append(key, value);
    }

    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto(url.href);
    await page.waitForSelector('.card', { timeout: 3000 });

    const content: string = await page.content();
    await context.close();
    await browser.close();

    return content;
  }

  private getRequestUrl(endpoint: string): URL {
    return new URL(`https://bdocodex.com/${endpoint}`);
  }
}
