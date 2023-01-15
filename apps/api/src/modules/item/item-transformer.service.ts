import { Injectable } from '@nestjs/common';
import {
  BlackDesertItem,
  BlackDesertItemDetails,
  BlackDesertItemDetailsAvailability,
  BlackDesertItemDetailsHistory,
  BlackDesertItemHot,
  BlackDesertItemQueue,
  BlackDesertItemTooltip,
  BlackDesertItemTooltipSection,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { JSDOM } from 'jsdom';
import { I18nContext } from 'nestjs-i18n';
import { BlackDesertItemDetailsExtendedOnly } from '@/interfaces/objects/black-desert-item-details.interface';
import {
  ExternalMarketRawItemDetails,
  ExternalMarketRawItemDetailsElement,
} from '@/interfaces/objects/external-market-raw.interface';
import {
  ExternalMarketItem,
  ExternalMarketItemDetails,
  ExternalMarketItemDetailsHistory,
  ExternalMarketItemHot,
  ExternalMarketItemQueue,
  ExternalMarketItemType,
} from '@/interfaces/objects/external-market.interface';
import { BdoCodexScraperService } from '@/modules/bdo-codex/bdo-codex-scraper.service';

@Injectable()
export class ItemTransformerService {
  constructor(private readonly bdoCodexScraperService: BdoCodexScraperService) {}

  public transformExternalMarketItem(item: ExternalMarketItem): BlackDesertItem {
    return {
      id: item.mainKey,
      name: item.name,
      count: item.sumCount,
      grade: item.grade,
      basePrice: item.minPrice,
    };
  }

  public transformExternalMarketItemType(itemType: ExternalMarketItemType): BlackDesertItemType {
    return {
      id: itemType.mainKey,
      name: itemType.name,
      count: itemType.count,
      grade: itemType.grade,
      basePrice: itemType.pricePerOne,
      mainCategory: itemType.mainCategory,
      subCategory: itemType.subCategory,
      enhancement: itemType.chooseKey,
      tradeCount: itemType.totalTradeCount,
    };
  }

  public transformExternalMarketItemHot(itemHot: ExternalMarketItemHot): BlackDesertItemHot {
    return {
      id: itemHot.mainKey,
      name: itemHot.name,
      count: itemHot.count,
      grade: itemHot.grade,
      basePrice: itemHot.pricePerOne,
      mainCategory: itemHot.mainCategory,
      subCategory: itemHot.subCategory,
      enhancement: itemHot.chooseKey,
      tradeCount: itemHot.totalTradeCount,
      fluctuationType: itemHot.fluctuationType,
      fluctuationPrice: itemHot.fluctuationPrice,
    };
  }

  public transformExternalMarketItemQueue(itemQueue: ExternalMarketItemQueue): BlackDesertItemQueue {
    return {
      id: itemQueue.mainKey,
      name: itemQueue.name,
      count: itemQueue.count,
      grade: itemQueue.grade,
      basePrice: itemQueue._pricePerOne,
      mainCategory: itemQueue.mainCategory,
      subCategory: itemQueue.subCategory,
      enhancement: itemQueue.chooseKey,
      endTime: itemQueue._waitEndTime,
    };
  }

  public transformExternalMarketItemDetails(itemDetails: ExternalMarketItemDetails): BlackDesertItemDetails {
    const availability: BlackDesertItemDetailsAvailability[] = [];
    const history: BlackDesertItemDetailsHistory[] = [];

    const parsedHistory: ExternalMarketItemDetailsHistory[] = JSON.parse(itemDetails.resultMsg);

    for (const oneAvailability of itemDetails.marketConditionList) {
      availability.push({
        sellCount: oneAvailability.sellCount,
        buyCount: oneAvailability.buyCount,
        onePrice: oneAvailability.pricePerOne,
      });
    }

    for (const oneHistory of parsedHistory) {
      history.push({
        date: oneHistory.days,
        onePrice: oneHistory.value,
      });
    }

    return {
      availability: availability,
      history: history,
      basePrice: itemDetails.basePrice,
      sellCount: itemDetails.biddingSellCount,
    };
  }

  public transformExternalMarketRawItemDetails(
    itemDetails: ExternalMarketRawItemDetails,
    enhancement: number,
  ): BlackDesertItemDetailsExtendedOnly {
    const parsedDetails: ExternalMarketRawItemDetailsElement[] = itemDetails.resultMsg
      .split('|')
      .map((element: string): ExternalMarketRawItemDetailsElement => {
        return Object.fromEntries(Object.entries(element.split('-')));
      });

    for (const oneDetails of parsedDetails) {
      const oneDetailsEnhancement: number = Number(oneDetails['1']);
      const oneDetailsRecentPrice: number = Number(oneDetails['8']);
      const oneDetailsRecentTransaction: number = Number(oneDetails['9']);

      if (oneDetailsEnhancement !== enhancement) {
        continue;
      }

      return {
        recentPrice: oneDetailsRecentPrice,
        recentTransaction: oneDetailsRecentTransaction,
      };
    }
  }

  public transformBdoCodexItemTooltip(
    i18n: I18nContext,
    itemTooltip: string,
    id: number,
    enhancement: number,
  ): BlackDesertItemTooltip {
    const addConditionalObjectElement = <T>(condition: unknown, key: string, element: T): Record<string, T> => {
      return condition ? { [key]: element } : {};
    };

    const addConditionalArrayElement = <T>(condition: unknown, element: T): [T] | [] => {
      return condition ? [element] : [];
    };

    const dom: JSDOM = new JSDOM(itemTooltip);
    const document: Document = dom.window.document;

    this.bdoCodexScraperService.injectI18nContext(i18n);

    const name: string = this.bdoCodexScraperService.scrapeName(document.body);
    const category: string = this.bdoCodexScraperService.scrapeCategory(document.body);
    const damage: string = this.bdoCodexScraperService.scrapeDamage(document.body);
    const defense: string = this.bdoCodexScraperService.scrapeDefense(document.body);
    const accuracy: string = this.bdoCodexScraperService.scrapeAccuracy(document.body);
    const evasion: string = this.bdoCodexScraperService.scrapeEvasion(document.body);
    const damageReduction: string = this.bdoCodexScraperService.scrapeDamageReduction(document.body);
    const weight: string = this.bdoCodexScraperService.scrapeWeight(document.body);
    const personalTransaction: string = this.bdoCodexScraperService.scrapePersonalTransaction(document.body);
    const enhancementType: string = this.bdoCodexScraperService.scrapeEnhancementType(document.body);
    const classExclusive: string = this.bdoCodexScraperService.scrapeClassExclusive(document.body);
    const description: string = this.bdoCodexScraperService.scrapeDescription(document.body);
    const itemEffect: string[] = this.bdoCodexScraperService.scrapeItemEffect(document.body);
    const enhancementEffect: string[] = this.bdoCodexScraperService.scrapeEnhancementEffect(document.body);
    const specialEffect: string[] = this.bdoCodexScraperService.scrapeSpecialEffect(document.body);
    const price: string = this.bdoCodexScraperService.scrapePrice(document.body);
    const durability: string = this.bdoCodexScraperService.scrapeDurability(document.body);

    return {
      id: id,
      enhancement: enhancement,
      name: name,
      category: category,
      ...addConditionalObjectElement<string>(damage !== '0~0' && damage !== '0', 'damage', damage),
      ...addConditionalObjectElement<string>(defense !== '0', 'defense', defense),
      ...addConditionalObjectElement<string>(accuracy !== '0', 'accuracy', accuracy),
      ...addConditionalObjectElement<string>(evasion !== '0', 'evasion', evasion),
      ...addConditionalObjectElement<string>(damageReduction !== '0', 'damageReduction', damageReduction),
      weight: weight,
      sections: [
        {
          id: 'personalTransaction',
          name: `${i18n.translate('tooltip.personalTransaction')} ${personalTransaction}`,
        },
        ...addConditionalArrayElement<BlackDesertItemTooltipSection>(enhancementType, {
          id: 'enhancementType',
          name: i18n.translate('tooltip.enhancementType'),
          values: [enhancementType],
        }),
        ...addConditionalArrayElement<BlackDesertItemTooltipSection>(classExclusive, {
          id: 'classExclusive',
          name: `${classExclusive} ${i18n.translate('tooltip.classExclusive')}`,
        }),
        {
          id: 'description',
          name: i18n.translate('tooltip.description'),
          values: [description],
        },
        ...addConditionalArrayElement<BlackDesertItemTooltipSection>(itemEffect.length, {
          id: 'itemEffect',
          name: i18n.translate('tooltip.itemEffect'),
          values: itemEffect,
        }),
        ...addConditionalArrayElement<BlackDesertItemTooltipSection>(enhancementEffect.length, {
          id: 'enhancementEffect',
          name: i18n.translate('tooltip.enhancementEffect'),
          values: enhancementEffect,
        }),
        ...addConditionalArrayElement<BlackDesertItemTooltipSection>(specialEffect.length, {
          id: 'specialEffect',
          name: i18n.translate('tooltip.specialEffect'),
          values: specialEffect,
        }),
        {
          id: 'price',
          name: i18n.translate('tooltip.price'),
          values: [price || 'N/A'],
        },
        ...addConditionalArrayElement<BlackDesertItemTooltipSection>(durability, {
          id: 'durability',
          name: i18n.translate('tooltip.durability'),
          values: [durability],
        }),
      ],
    };
  }
}
