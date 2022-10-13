import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  public root() {
    return {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
    };
  }
}
