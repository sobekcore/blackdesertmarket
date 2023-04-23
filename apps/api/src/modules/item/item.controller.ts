import { Controller, Get, Header, Param, Query, StreamableFile } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  BlackDesertItemDetails,
  BlackDesertItemDetailsExtended,
  BlackDesertItemTooltip,
  BlackDesertItemType,
} from '@blackdesertmarket/interfaces';
import { I18n, I18nContext } from 'nestjs-i18n';
import { EnhancementParam } from '@/swagger/enhancement.param';
import { IdParam } from '@/swagger/id.param';
import { LanguageQuery } from '@/swagger/language.query';
import { RegionQuery } from '@/swagger/region.query';
import { ControllerResponse } from '@/interfaces/objects/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { HttpHeader } from '@/enums/http.enum';
import { Region } from '@/decorators/region.decorator';
import { RegionContext } from '@/contexts/region.context';
import { FindDetailsByIdParamsDto, FindDetailsByIdQueryDto } from '@/modules/item/dto/find-details-by-id.dto';
import { FindIconByIdParamsDto } from '@/modules/item/dto/find-icon-by-id.dto';
import { FindTooltipByIdParamsDto } from '@/modules/item/dto/find-tooltip-by-id.dto';
import { FindTypesByIdParamsDto } from '@/modules/item/dto/find-types-by-id.dto';
import { ItemService } from '@/modules/item/item.service';

@ApiTags('Item')
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiQuery(LanguageQuery)
  @ApiQuery(RegionQuery)
  @ApiParam(IdParam)
  @Get('/:id')
  public async findTypesById(
    @Region() region: RegionContext,
    @I18n() i18n: I18nContext,
    @Param() params: FindTypesByIdParamsDto,
  ): Promise<ControllerResponse<BlackDesertItemType[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findTypesById(region, i18n, params.id),
    };
  }

  @ApiParam(IdParam)
  @Get('/:id/icon')
  @Header(HttpHeader.CONTENT_TYPE, 'image/png')
  public async findIconById(@Param() params: FindIconByIdParamsDto): Promise<StreamableFile> {
    return new StreamableFile(await this.itemService.findIconById(params.id), { type: 'image/png' });
  }

  @ApiQuery(LanguageQuery)
  @ApiQuery(RegionQuery)
  @ApiParam(EnhancementParam)
  @ApiParam(IdParam)
  @Get('/:id/:enhancement')
  public async findDetailsById(
    @Region() region: RegionContext,
    @I18n() i18n: I18nContext,
    @Param() params: FindDetailsByIdParamsDto,
    @Query() query: FindDetailsByIdQueryDto,
  ): Promise<ControllerResponse<BlackDesertItemDetails | BlackDesertItemDetailsExtended>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findDetailsById(region, i18n, params.id, params.enhancement, query.extended),
    };
  }

  @ApiQuery(LanguageQuery)
  @ApiParam(EnhancementParam)
  @ApiParam(IdParam)
  @Get('/:id/:enhancement/tooltip')
  public async findTooltipById(
    @I18n() i18n: I18nContext,
    @Param() params: FindTooltipByIdParamsDto,
  ): Promise<ControllerResponse<BlackDesertItemTooltip>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.itemService.findTooltipById(i18n, params.id, params.enhancement),
    };
  }
}
