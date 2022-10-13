import { Controller, Get, Param, Body } from '@nestjs/common';
import { BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { ItemService } from '@/modules/item/item.service';
import { FindByIdDTOBody, FindByIdDTOParams } from '@/modules/item/dto/find-by-id.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:id/:enhancement')
  public async findById(
    @Param() params: FindByIdDTOParams,
    @Body() body: FindByIdDTOBody,
  ): Promise<ControllerResponse<BlackDesertItemDetails>> {
    const data: BlackDesertItemDetails = await this.itemService.findById(
      params.id,
      params.enhancement,
      body.region,
      body.language,
    );

    return {
      code: ControllerResponseCode.SUCCESS,
      data: data,
    };
  }
}
