import { Controller, Get, Header, Param, Query, StreamableFile } from '@nestjs/common';
import {
  BlackDesertItemDetails,
  BlackDesertItemDetailsExtended,
  BlackDesertItemTooltip,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { ControllerResponse } from '@/interfaces/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { HttpHeader } from '@/enums/http.enum';
import { FindDetailsByIdParamsDto, FindDetailsByIdQueryDto } from '@/modules/item/dto/find-details-by-id.dto';
import { FindIconByIdParamsDto } from '@/modules/item/dto/find-icon-by-id.dto';
import { FindTooltipByIdParamsDto, FindTooltipByIdQueryDto } from '@/modules/item/dto/find-tooltip-by-id.dto';
import { FindTypesByIdParamsDto, FindTypesByIdQueryDto } from '@/modules/item/dto/find-types-by-id.dto';
import { ItemService } from '@/modules/item/item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/:id')
  public async findTypesById(
    @Param() params: FindTypesByIdParamsDto,
    @Query() query: FindTypesByIdQueryDto,
  ): Promise<ControllerResponse<BlackDesertItemType[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findTypesById(params.id, query.region, query.language),
    };
  }

  @Get('/:id/icon')
  @Header(HttpHeader.CONTENT_TYPE, 'image/png')
  public async findIconById(@Param() params: FindIconByIdParamsDto): Promise<StreamableFile> {
    return new StreamableFile(await this.itemService.findIconById(params.id), { type: 'image/png' });
  }

  @Get('/:id/:enhancement')
  public async findDetailsById(
    @Param() params: FindDetailsByIdParamsDto,
    @Query() query: FindDetailsByIdQueryDto,
  ): Promise<ControllerResponse<BlackDesertItemDetails | BlackDesertItemDetailsExtended>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findDetailsById(
        params.id,
        params.enhancement,
        query.extended,
        query.region,
        query.language,
      ),
    };
  }

  @Get('/:id/:enhancement/tooltip')
  public async findTooltipById(
    @Param() params: FindTooltipByIdParamsDto,
    @Query() query: FindTooltipByIdQueryDto,
  ): Promise<ControllerResponse<BlackDesertItemTooltip>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findTooltipById(params.id, params.enhancement, query.language),
    };
  }
}
