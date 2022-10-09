import { Controller, Get, Param } from '@nestjs/common';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ControllerResponse } from '@/interfaces/controller-response';
import { ControllerResponseCode } from '@/enums/controller-response-code';
import { ListService } from '@/modules/list/list.service';
import { FindByCategoryDTOParams } from '@/modules/list/dto/find-by-category.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/:mainCategory/:subCategory')
  async findByCategory(@Param() params: FindByCategoryDTOParams): Promise<ControllerResponse<BlackDesertItem[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.listService.findByCategory(params.mainCategory, params.subCategory),
    };
  }
}
