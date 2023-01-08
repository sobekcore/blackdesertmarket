import { HtmlScraperMatch } from '@/interfaces/html-scraper-match.interface';

export class MatchRegex implements HtmlScraperMatch {
  protected found: RegExpMatchArray;

  public constructor(private readonly element: HTMLElement, private readonly query: RegExp) {}

  public find(): this {
    this.found = this.element.outerHTML.match(this.query);

    return this;
  }

  public getRegexGroup(group: number): string {
    return this.found?.[group]?.trim() || '';
  }
}
