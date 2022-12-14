import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlackDesertItem, BlackDesertItemHot, BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ListService } from '@/modules/list/list.service';
import { FindHotItemsDTOQuery } from '@/modules/list/dto/find-hot-items.dto';
import { FindQueueItemsDTOQuery } from '@/modules/list/dto/find-queue-items.dto';
import { FindByCategoryDTOParams, FindByCategoryDTOQuery } from '@/modules/list/dto/find-by-category.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/hot')
  public async findHotItems(@Query() query: FindHotItemsDTOQuery): Promise<ControllerResponse<BlackDesertItemHot[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.listService.findHotItems(query.region, query.language),
    };
  }

  @Get('/queue')
  public async findQueueItems(
    @Query() query: FindQueueItemsDTOQuery,
  ): Promise<ControllerResponse<BlackDesertItemQueue[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.listService.findQueueItems(query.region, query.language),
    };
  }

  @Get('/:mainCategory/:subCategory')
  public async findByCategory(
    @Param() params: FindByCategoryDTOParams,
    @Query() query: FindByCategoryDTOQuery,
  ): Promise<ControllerResponse<BlackDesertItem[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.listService.findByCategory(
        params.mainCategory,
        params.subCategory,
        query.region,
        query.language,
      ),
    };
  }
}
