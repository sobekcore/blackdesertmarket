import { Controller, Get, Param, Body } from '@nestjs/common';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ListService } from '@/modules/list/list.service';
import { FindByCategoryDTOParams, FindByCategoryDTOBody } from '@/modules/list/dto/find-by-category.dto';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/:mainCategory/:subCategory')
  public async findByCategory(
    @Param() params: FindByCategoryDTOParams,
    @Body() body: FindByCategoryDTOBody,
  ): Promise<ControllerResponse<BlackDesertItem[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.listService.findByCategory(params.mainCategory, params.subCategory, body.region, body.language),
    };
  }
}
