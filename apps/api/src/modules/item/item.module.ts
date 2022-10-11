import { Module } from '@nestjs/common';
import { ItemService } from '@/modules/item/item.service';

@Module({
  providers: [ItemService],
})
export class ItemModule {}
