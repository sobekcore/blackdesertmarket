import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  /**
   * None of the actions should be placed in AppController
   * which is an entrypoint for the whole application.
   *
   * New modules/controllers should be created instead
   * and imported to the root application module of AppModule.
   */

  @Get('/')
  public root() {
    return {
      name: process.env.npm_package_name,
      version: process.env.npm_package_version,
    };
  }
}
