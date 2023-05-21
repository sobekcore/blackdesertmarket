import { LanguageCode } from '@/enums/language';
// en-US
import enUS_date from '@/i18n/en-US/date.json';
import enUS_generic from '@/i18n/en-US/generic.json';
import enUS_header from '@/i18n/en-US/header.json';
import enUS_itemDetails from '@/i18n/en-US/item-details.json';
import enUS_itemFavorites from '@/i18n/en-US/item-favorites.json';
import enUS_itemQueue from '@/i18n/en-US/item-queue.json';
import enUS_itemType from '@/i18n/en-US/item-type.json';
import enUS_item from '@/i18n/en-US/item.json';
import enUS_legal from '@/i18n/en-US/legal.json';
import enUS_listFilter from '@/i18n/en-US/list-filter.json';
import enUS_notification from '@/i18n/en-US/notification.json';
import enUS_sidemenu from '@/i18n/en-US/sidemenu.json';
import enUS_tooltip from '@/i18n/en-US/tooltip.json';
// es-ES
import esES_date from '@/i18n/es-ES/date.json';
import esES_generic from '@/i18n/es-ES/generic.json';
import esES_header from '@/i18n/es-ES/header.json';
import esES_itemDetails from '@/i18n/es-ES/item-details.json';
import esES_itemFavorites from '@/i18n/es-ES/item-favorites.json';
import esES_itemQueue from '@/i18n/es-ES/item-queue.json';
import esES_itemType from '@/i18n/es-ES/item-type.json';
import esES_item from '@/i18n/es-ES/item.json';
import esES_legal from '@/i18n/es-ES/legal.json';
import esES_listFilter from '@/i18n/es-ES/list-filter.json';
import esES_notification from '@/i18n/es-ES/notification.json';
import esES_tooltip from '@/i18n/es-ES/tooltip.json';

export const messages = {
  [LanguageCode.ENGLISH]: {
    date: enUS_date,
    generic: enUS_generic,
    header: enUS_header,
    itemDetails: enUS_itemDetails,
    itemFavorites: enUS_itemFavorites,
    itemQueue: enUS_itemQueue,
    itemType: enUS_itemType,
    item: enUS_item,
    legal: enUS_legal,
    listFilter: enUS_listFilter,
    notification: enUS_notification,
    sidemenu: enUS_sidemenu,
    tooltip: enUS_tooltip,
  },
  [LanguageCode.SPANISH]: {
    date: esES_date,
    generic: esES_generic,
    header: esES_header,
    itemDetails: esES_itemDetails,
    itemFavorites: esES_itemFavorites,
    itemQueue: esES_itemQueue,
    itemType: esES_itemType,
    item: esES_item,
    legal: esES_legal,
    listFilter: esES_listFilter,
    notification: esES_notification,
    /**
     * TODO: Create translations for sidemenu keys in SPANISH
     */
    sidemenu: enUS_sidemenu,
    tooltip: esES_tooltip,
  },
};
