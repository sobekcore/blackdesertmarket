import { Injectable } from '@nestjs/common';
import { AbstractHtmlScraperService } from '@/modules/html-scraper/abstract-html-scraper.service';

@Injectable()
export class BdoCodexScraperService extends AbstractHtmlScraperService {
  public scrapeName(element: HTMLElement): string {
    return this.match(element, '.item_title').find().text();
  }

  public scrapeCategory(element: HTMLElement): string {
    return this.match(element, '.category_text').find().text().replace('-', '').trim();
  }

  public scrapeDamage(element: HTMLElement): string {
    return this.match(element, '#damage').find().text();
  }

  public scrapeDefense(element: HTMLElement): string {
    return this.match(element, '#defense').find().text();
  }

  public scrapeAccuracy(element: HTMLElement): string {
    return this.match(element, '#accuracy').find().text();
  }

  public scrapeWeight(element: HTMLElement): string {
    return this.matchRegex(element, /Weight: ([\d.]+) LT/)
      .find()
      .getRegexGroup(1);
  }

  public scrapePersonalTransaction(element: HTMLElement): string {
    return this.matchRegex(element, /Personal transaction (\w+)/)
      .find()
      .getRegexGroup(1);
  }

  public scrapeEnhancementType(element: HTMLElement): string {
    return this.matchRegex(element, /Enhancement Type: (\w+)/)
      .find()
      .getRegexGroup(1);
  }

  public scrapeClassExclusive(element: HTMLElement): string {
    return this.matchRegex(element, /Exclusive: ([\w, ]+)/)
      .find()
      .getRegexGroup(1);
  }

  public scrapeDescription(element: HTMLElement): string {
    return this.matchRegex(element, /Description:<br>(<.+?>)?(.+?(?=<))/)
      .find()
      .getRegexGroup(2);
  }

  public scrapeItemEffect(element: HTMLElement): string[] {
    return this.matchRegexMultiple(element, /Item Effect <br>(.+?(?=<br><br>|<br><\/div>))/)
      .find()
      .matchRegexGroup(1, /<span.*?>(.+?)<\/span>/)
      .getChildRegexGroup(1);
  }

  public scrapeEnhancementEffect(element: HTMLElement): string[] {
    return this.matchRegexMultiple(element, /Enhancement Effect <br>(.+?(?=<br><br>|<br><\/div>))/)
      .find()
      .matchRegexGroup(1, /<span.*?>(.+?)<\/span>/)
      .getChildRegexGroup(1);
  }

  public scrapeSpecialEffect(element: HTMLElement): string[] {
    return this.matchRegexMultiple(element, /Special Effect <br>(.+?(?=<br><\/div>))/)
      .find()
      .matchRegexGroup(1, /<span.*?>(.+?)<\/span>/)
      .getChildRegexGroup(1);
  }

  public scrapePrice(element: HTMLElement): string {
    return this.matchRegex(element, /Sell price: ([\d,]+)/)
      .find()
      .getRegexGroup(1);
  }

  public scrapeDurability(element: HTMLElement): string {
    return this.match(element, '#durability').find().text();
  }
}
