import { HtmlScraperMatch } from '@/interfaces/html-scraper-match.interface';

export class Match implements HtmlScraperMatch {
  private found: HTMLElement;

  public constructor(private readonly element: HTMLElement, private readonly query: string) {}

  public find(): this {
    this.found = this.element.querySelector(this.query);

    return this;
  }

  public text(): string {
    return this.found?.textContent?.trim() || '';
  }
}
