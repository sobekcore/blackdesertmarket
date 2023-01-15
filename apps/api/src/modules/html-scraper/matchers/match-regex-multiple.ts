import { HtmlScraperMatch } from '@/interfaces/classes/html-scraper-match';
import { HtmlScraperException } from '@/exceptions/html-scraper.exception';

export class MatchRegexMultiple implements HtmlScraperMatch {
  protected found: RegExpMatchArray;
  private matches: RegExpMatchArray[];

  constructor(private readonly element: HTMLElement, private readonly query: RegExp) {}

  public find(): this {
    this.found = this.element.outerHTML.match(this.query);

    return this;
  }

  public matchRegexGroup(group: number, query: RegExp): this {
    const regex: RegExp = new RegExp(query, 'g');
    this.matches = Array.from(this.found?.[group]?.matchAll(regex) || []);

    return this;
  }

  public getRegexGroup(group: number): string {
    return this.found?.[group]?.trim() || '';
  }

  public getChildRegexGroup(group: number): string[] {
    if (!this.matches) {
      throw new HtmlScraperException('Child RegExp groups need to be first created with matchRegexGroup method');
    }

    return this.matches.map((match: RegExpMatchArray): string => match[group]?.trim());
  }
}
