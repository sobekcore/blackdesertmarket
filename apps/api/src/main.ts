import { BadRequestException, INestApplication, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { AllExceptionsFilter } from '@/filters/all-exceptions.filter';
import { BadRequestExceptionFilter } from '@/filters/bad-request-exception.filter';
import { NotFoundExceptionFilter } from '@/filters/not-found-exception.filter';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new BadRequestExceptionFilter());
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
