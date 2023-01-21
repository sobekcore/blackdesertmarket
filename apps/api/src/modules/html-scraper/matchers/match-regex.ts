import { HtmlScraperMatch } from '@/interfaces/classes/html-scraper-match';

export class MatchRegex implements HtmlScraperMatch {
  protected found: RegExpMatchArray;

  constructor(private readonly element: HTMLElement, private readonly query: RegExp) {}

  public find(): this {
    this.found = this.element.outerHTML.match(this.query);

    return this;
  }

  public getRegexGroup(group: number): string {
    return this.found?.[group]?.trim() || '';
  }
}
