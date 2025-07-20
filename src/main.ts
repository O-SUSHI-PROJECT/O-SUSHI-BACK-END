import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import { ValidationPipe } from '@nestjs/common';
import RequestInterceptor from './core/interceptors/request.interceptor';
import AppLogger from './core/configuration/loggers/app.logger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap(): Promise<void> {
  const PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new RequestInterceptor(new AppLogger()));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
    }),
  );

  app.enableCors({
    origin: [/http(s)?:\/\/localhost:3001/, /http(s)?:\/\/localhost:3000/],
  });

  const config = new DocumentBuilder()
  .setTitle('O Sushi')
  .setDescription('API do sistema de delivery de comida japonesa')
  .setVersion('1.0')
  .addApiKey(
    {
      type: 'apiKey',
      name: 'x-api-key',
      in: 'header',
      description: 'Chave de API para autenticação'
    },
    'api-key'
  )
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap();
