import { LanguageCode } from '@/enums/language';
// en-US
import enUS_date from '@/i18n/en-US/date.json';
import enUS_generic from '@/i18n/en-US/generic.json';
import enUS_itemDetails from '@/i18n/en-US/item-details.json';
import enUS_itemQueue from '@/i18n/en-US/item-queue.json';
import enUS_itemType from '@/i18n/en-US/item-type.json';
import enUS_item from '@/i18n/en-US/item.json';
import enUS_sidemenu from '@/i18n/en-US/sidemenu.json';
import enUS_tooltip from '@/i18n/en-US/tooltip.json';
// es-ES
import esES_date from '@/i18n/es-ES/date.json';
import esES_generic from '@/i18n/es-ES/generic.json';
import esES_itemDetails from '@/i18n/es-ES/item-details.json';
import esES_itemQueue from '@/i18n/es-ES/item-queue.json';
import esES_itemType from '@/i18n/es-ES/item-type.json';
import esES_item from '@/i18n/es-ES/item.json';
import esES_tooltip from '@/i18n/es-ES/tooltip.json';

export const messages = {
  [LanguageCode.ENGLISH]: {
    date: enUS_date,
    generic: enUS_generic,
    itemDetails: enUS_itemDetails,
    itemQueue: enUS_itemQueue,
    itemType: enUS_itemType,
    item: enUS_item,
    sidemenu: enUS_sidemenu,
    tooltip: enUS_tooltip,
  },
  [LanguageCode.SPANISH]: {
    date: esES_date,
    generic: esES_generic,
    itemDetails: esES_itemDetails,
    itemQueue: esES_itemQueue,
    itemType: esES_itemType,
    item: esES_item,
    /**
     * TODO: Create translations for sidemenu keys in SPANISH
     */
    sidemenu: enUS_sidemenu,
    tooltip: esES_tooltip,
  },
};
