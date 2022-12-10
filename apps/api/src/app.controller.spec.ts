import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/app.controller';
import { CoreModule } from '@/core.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return information about the application', () => {
      const information: unknown = appController.root();

      expect(information).toHaveProperty('name');
      expect(information).toHaveProperty('version');
    });
  });
});
