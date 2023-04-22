import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ControllerResponseCode } from '@/enums/controller-response.enum';
import { AllExceptionsFilter } from '@/filters/all-exceptions.filter';
import { BadRequestExceptionFilter } from '@/filters/bad-request-exception.filter';
import { NotFoundExceptionFilter } from '@/filters/not-found-exception.filter';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.useStaticAssets(join(__dirname, '../public'), {
    prefix: '/public',
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

  const documentBuilder: DocumentBuilder = new DocumentBuilder();
  const config: Omit<OpenAPIObject, 'paths'> = documentBuilder.setTitle('Black Desert Market API').build();
  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('', app, document, {
    customSiteTitle: 'Black Desert Market API',
    customfavIcon: '/public/favicon.ico',
    customCssUrl: '/public/swagger.css',
  });

  await app.listen(3000);
}

bootstrap();
