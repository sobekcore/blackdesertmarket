import { Test, TestingModule } from '@nestjs/testing';
import { CoreModuleMock } from '@test/mocks/core-module.mock';
import { AppController } from '@/app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModuleMock],
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return information about the application', () => {
      const information: unknown = appController.root();

      expect(information).toHaveProperty('name');
    });
  });
});
