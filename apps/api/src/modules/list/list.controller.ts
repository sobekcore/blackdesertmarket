import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ListService } from '@/modules/list/list.service';
import { FindByCategoryDTOParams, FindByCategoryDTOQuery } from '@/modules/list/dto/find-by-category.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

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
