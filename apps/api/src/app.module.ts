import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { ListModule } from '@/modules/list/list.module';

@Module({
  imports: [ListModule],
  controllers: [AppController],
})
export class AppModule {}
