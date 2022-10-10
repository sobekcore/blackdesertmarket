import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException, ValidationPipe, ValidationError } from '@nestjs/common';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { AllExceptionsFilter } from '@/filters/all-exceptions.filter';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.local', '.env'],
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]): BadRequestException => {
        const messages = errors.map((error) => {
          return Object.values(error.constraints);
        });

        const flattenedMessages = messages.flat();
        const uniqueMessages = Array.from(new Set(flattenedMessages));

        return new BadRequestException({
          code: ControllerResponseCode.ERROR_INVALID_PARAMETERS,
          messages: uniqueMessages,
        });
      },
    }),
  );

  await app.listen(3000);
}

bootstrap();
