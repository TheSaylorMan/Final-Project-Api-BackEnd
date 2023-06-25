import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationBadRequestException } from './validation-bad-request.exception';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { config as awsConfig } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Unflow Work API')
    .setDescription('Unflow Daily Operations API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: false,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationBadRequestException(validationErrors);
      },
    }),
  );

  awsConfig.update({
    accessKeyId: configService.getOrThrow('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
    region: configService.getOrThrow('AWS_REGION'),
  });

  await app.listen(3001);
}
bootstrap();
