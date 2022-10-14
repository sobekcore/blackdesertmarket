import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { BadRequestException, ValidationPipe, ValidationError } from '@nestjs/common';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { AllExceptionsFilter } from '@/filters/all-exceptions.filter';
import { NotFoundExceptionFilter } from '@/filters/not-found-exception.filter';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.local', '.env'],
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new NotFoundExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]): BadRequestException => {
        const messages: string[][] = errors.map((error: ValidationError): string[] => {
          return Object.values(error.constraints);
        });

        const flattenedMessages: string[] = messages.flat();
        const uniqueMessages: string[] = Array.from(new Set(flattenedMessages));

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
