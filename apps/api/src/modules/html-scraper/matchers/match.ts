import { HtmlScraperMatch } from '@/interfaces/classes/html-scraper-match';

export class Match implements HtmlScraperMatch {
  private found: HTMLElement;

  constructor(private readonly element: HTMLElement, private readonly query: string) {}

  public find(): this {
    this.found = this.element.querySelector(this.query);

    return this;
  }

  public text(): string {
    return this.found?.textContent?.trim() || '';
  }

  public html(): string {
    return this.found?.innerHTML || '';
  }
}
