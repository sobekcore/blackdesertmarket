import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('displayApplicationDetails', () => {
    it('should contain application details', () => {
      const details = appController.displayApplicationDetails();

      expect(details).toHaveProperty('name');
      expect(details).toHaveProperty('version');
    });
  });

  describe('getExampleItemSchema', () => {
    it('should contain all BlackDesertItem properties', () => {
      const item = appController.getExampleItemSchema();

      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('count');
      expect(item).toHaveProperty('grade');
      expect(item).toHaveProperty('price');
    });
  });
});
