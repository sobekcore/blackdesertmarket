import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ListController } from '@/modules/list/list.controller';
import { ListService } from '@/modules/list/list.service';

@Module({
  imports: [HttpModule],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
