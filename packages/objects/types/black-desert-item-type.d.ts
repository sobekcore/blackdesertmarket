import { BlackDesertItemType, BlackDesertItemHot, BlackDesertItemQueue } from '@blackdesertmarket/interfaces';

export function isValidBlackDesertItemType(itemType: unknown): itemType is BlackDesertItemType;

export function isValidBlackDesertItemHot(itemHot: unknown): itemHot is BlackDesertItemHot;

export function isValidBlackDesertItemQueue(itemQueue: unknown): itemQueue is BlackDesertItemQueue;
