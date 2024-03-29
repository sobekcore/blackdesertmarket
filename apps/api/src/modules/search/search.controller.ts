import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { I18n, I18nContext } from 'nestjs-i18n';
import { LanguageQuery } from '@/swagger/language.query';
import { RegionQuery } from '@/swagger/region.query';
import { SearchParam } from '@/swagger/search.param';
import { ControllerResponse } from '@/interfaces/objects/controller-response.interface';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { Region } from '@/decorators/region.decorator';
import { RegionContext } from '@/contexts/region.context';
import { FindBySearchParamsDto } from '@/modules/search/dto/find-by-search.dto';
import { SearchService } from '@/modules/search/search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiQuery(LanguageQuery)
  @ApiQuery(RegionQuery)
  @ApiParam(SearchParam)
  @Get('/:search')
  public async findBySearch(
    @Region() region: RegionContext,
    @I18n() i18n: I18nContext,
    @Param() params: FindBySearchParamsDto,
  ): Promise<ControllerResponse<BlackDesertItem[]>> {
    return {
      code: ControllerResponseCode.SUCCESS,
      data: await this.searchService.findBySearch(region, i18n, params.search),
    };
  }
}
