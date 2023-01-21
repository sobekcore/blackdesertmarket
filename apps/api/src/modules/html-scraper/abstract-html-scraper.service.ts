import { Match } from '@/modules/html-scraper/matchers/match';
import { MatchRegex } from '@/modules/html-scraper/matchers/match-regex';
import { MatchRegexMultiple } from '@/modules/html-scraper/matchers/match-regex-multiple';

export abstract class AbstractHtmlScraperService {
  public match(element: HTMLElement, query: string): Match {
    return new Match(element, query);
  }

  public matchRegex(element: HTMLElement, query: RegExp): MatchRegex {
    return new MatchRegex(element, query);
  }

  public matchRegexMultiple(element: HTMLElement, query: RegExp): MatchRegexMultiple {
    return new MatchRegexMultiple(element, query);
  }
}
