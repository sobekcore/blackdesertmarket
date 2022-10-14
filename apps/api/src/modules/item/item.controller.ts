import { Controller, Get, Param, Body } from '@nestjs/common';
import { BlackDesertItemType, BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ItemService } from '@/modules/item/item.service';
import { FindTypesByIdDTOParams, FindTypesByIdDTOBody } from '@/modules/item/dto/find-types-by-id.dto';
import { FindDetailsByIdDTOParams, FindDetailsByIdDTOBody } from '@/modules/item/dto/find-details-by-id.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:id')
  public async findTypesById(
    @Param() params: FindTypesByIdDTOParams,
    @Body() body: FindTypesByIdDTOBody,
  ): Promise<ControllerResponse<BlackDesertItemType[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findTypesById(params.id, body.region, body.language),
    };
  }

  @Get('/:id/:enhancement')
  public async findDetailsById(
    @Param() params: FindDetailsByIdDTOParams,
    @Body() body: FindDetailsByIdDTOBody,
  ): Promise<ControllerResponse<BlackDesertItemDetails>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findDetailsById(params.id, params.enhancement, body.region, body.language),
    };
  }
}
