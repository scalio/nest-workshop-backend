import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WrapInterceptor } from './common/interceptors/wrap.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .enableCors()
    .useGlobalPipes(new ValidationPipe())
    .useGlobalInterceptors(new TransformInterceptor(), new WrapInterceptor())
    .listen(3000);

  const document = new DocumentBuilder()
    .setTitle('ngAtl2018 - Nest workshop')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/api', app, swaggerDoc);
}
bootstrap();
