import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nContextInjectable } from '@/interfaces/classes/i18n-context-injectable';
import { AbstractHtmlScraperService } from '@/modules/html-scraper/abstract-html-scraper.service';

@Injectable()
export class BdoCodexScraperService extends AbstractHtmlScraperService implements I18nContextInjectable {
  private i18n: I18nContext = I18nContext.current();

  public injectI18nContext(i18n: I18nContext): void {
    this.i18n = i18n;
  }

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

  public scrapeEvasion(element: HTMLElement): string {
    const evasion = this.match(element, '#evasion').find().text();
    const bonusEvasion = this.match(element, '#hevasion').find().text();

    if (!bonusEvasion) {
      return evasion;
    }

    return `${evasion} ${bonusEvasion}`;
  }

  public scrapeDamageReduction(element: HTMLElement): string {
    const damageReduction = this.match(element, '#dreduction').find().text();
    const bonusDamageReduction = this.match(element, '#hdreduction').find().text();

    if (!bonusDamageReduction) {
      return damageReduction;
    }

    return `${damageReduction} ${bonusDamageReduction}`;
  }

  public scrapeWeight(element: HTMLElement): string {
    const word: string = this.i18n.translate('bdo-codex.weight');

    return this.matchRegex(element, new RegExp(`${word}: ([\\d.]+) LT`))
      .find()
      .getRegexGroup(1);
  }

  public scrapePersonalTransaction(element: HTMLElement): string {
    const word: string = this.i18n.translate('bdo-codex.personalTransaction');

    return this.matchRegex(element, new RegExp(`${word} ([\\w ]+)`))
      .find()
      .getRegexGroup(1);
  }

  public scrapeEnhancementType(element: HTMLElement): string {
    const word: string = this.i18n.translate('bdo-codex.enhancementType');

    return this.matchRegex(element, new RegExp(`${word}: (\\w+)`))
      .find()
      .getRegexGroup(1);
  }

  public scrapeClassExclusive(element: HTMLElement): string {
    const word: string = this.i18n.translate('bdo-codex.classExclusive');

    return this.matchRegex(element, new RegExp(`${word}: ([\\w, ]+)`))
      .find()
      .getRegexGroup(1);
  }

  public scrapeDescription(element: HTMLElement): string {
    const word: string = this.i18n.translate('bdo-codex.description');

    return this.matchRegex(element, new RegExp(`${word}:<br>(<.+?>)?(.+?(?=<))`))
      .find()
      .getRegexGroup(2);
  }

  public scrapeItemEffect(element: HTMLElement): string[] {
    const word: string = this.i18n.translate('bdo-codex.itemEffect');

    return this.matchRegexMultiple(element, new RegExp(`${word} <br>(.+?(?=<br><br>|<br><\/div>))`))
      .find()
      .matchRegexGroup(1, /<span.*?>(.+?)<\/span>/)
      .getChildRegexGroup(1);
  }

  public scrapeEnhancementEffect(element: HTMLElement): string[] {
    const word: string = this.i18n.translate('bdo-codex.enhancementEffect');

    return this.matchRegexMultiple(element, new RegExp(`${word} <br>(.+?(?=<br><br>|<br><\/div>))`))
      .find()
      .matchRegexGroup(1, /<span.*?>(.+?)<\/span>/)
      .getChildRegexGroup(1);
  }

  public scrapeSpecialEffect(element: HTMLElement): string[] {
    const word: string = this.i18n.translate('bdo-codex.specialEffect');

    return this.matchRegexMultiple(element, new RegExp(`${word} <br>(.+?(?=<br><\/div>))`))
      .find()
      .matchRegexGroup(1, /<span.*?>(.+?)<\/span>/)
      .getChildRegexGroup(1);
  }

  public scrapePrice(element: HTMLElement): string {
    const word: string = this.i18n.translate('bdo-codex.price');

    return this.matchRegex(element, new RegExp(`${word}: ([\\d,]+)`))
      .find()
      .getRegexGroup(1);
  }

  public scrapeDurability(element: HTMLElement): string {
    return this.match(element, '#durability').find().text();
  }
}
