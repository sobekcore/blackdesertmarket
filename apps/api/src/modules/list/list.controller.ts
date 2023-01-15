import { Controller, Get, Param } from '@nestjs/common';
import { BlackDesertItem, BlackDesertItemHot, BlackDesertItemQueue } from '@blackdesertmarket/interfaces';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ControllerResponse } from '@/interfaces/objects/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { Region } from '@/decorators/region.decorator';
import { RegionContext } from '@/contexts/region.context';
import { FindByCategoryParamsDto } from '@/modules/list/dto/find-by-category.dto';
import { ListService } from '@/modules/list/list.service';

@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get('/hot')
  public async findHotItems(
    @Region() region: RegionContext,
    @I18n() i18n: I18nContext,
  ): Promise<ControllerResponse<BlackDesertItemHot[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.listService.findHotItems(region, i18n),
    };
  }

  @Get('/queue')
  public async findQueueItems(
    @Region() region: RegionContext,
    @I18n() i18n: I18nContext,
  ): Promise<ControllerResponse<BlackDesertItemQueue[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.listService.findQueueItems(region, i18n),
    };
  }

  @Get('/:mainCategory/:subCategory')
  public async findByCategory(
    @Region() region: RegionContext,
    @I18n() i18n: I18nContext,
    @Param() params: FindByCategoryParamsDto,
  ): Promise<ControllerResponse<BlackDesertItem[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.listService.findByCategory(region, i18n, params.mainCategory, params.subCategory),
    };
  }
}
