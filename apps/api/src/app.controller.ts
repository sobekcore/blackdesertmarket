import { Controller, Get } from '@nestjs/common';
import { BlackDesertItem } from '@blackdesertmarket/interfaces';
import { AppService } from '@/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  displayApplicationDetails() {
    return {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
    };
  }

  @Get('/example-item-schema')
  getExampleItemSchema(): BlackDesertItem {
    return this.appService.getExampleItem();
  }
}
