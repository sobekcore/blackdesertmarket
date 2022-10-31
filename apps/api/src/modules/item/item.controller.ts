import { StreamableFile, Controller, Get, Param, Query, Header } from '@nestjs/common';
import { BlackDesertItemType, BlackDesertItemDetails } from '@blackdesertmarket/interfaces';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { HttpHeader } from '@/enums/http.enum';
import { ItemService } from '@/modules/item/item.service';
import { FindTypesByIdDTOParams, FindTypesByIdDTOQuery } from '@/modules/item/dto/find-types-by-id.dto';
import { FindDetailsByIdDTOParams, FindDetailsByIdDTOQuery } from '@/modules/item/dto/find-details-by-id.dto';
import { FindIconByIdDTOParams } from '@/modules/item/dto/find-icon-by-id.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:id')
  public async findTypesById(
    @Param() params: FindTypesByIdDTOParams,
    @Query() query: FindTypesByIdDTOQuery,
  ): Promise<ControllerResponse<BlackDesertItemType[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findTypesById(params.id, query.region, query.language),
    };
  }

  @Get('/icon/:id')
  @Header(HttpHeader.CONTENT_TYPE, 'image/png')
  public async findIconById(@Param() params: FindIconByIdDTOParams): Promise<StreamableFile> {
    return new StreamableFile(await this.itemService.findIconById(params.id));
  }

  @Get('/:id/:enhancement')
  public async findDetailsById(
    @Param() params: FindDetailsByIdDTOParams,
    @Query() query: FindDetailsByIdDTOQuery,
  ): Promise<ControllerResponse<BlackDesertItemDetails>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findDetailsById(params.id, params.enhancement, query.region, query.language),
    };
  }
}
