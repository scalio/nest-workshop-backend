import * as cors from 'cors';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WrapInterceptor } from './common/interceptors/wrap.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor(), new WrapInterceptor());

  await app.listen(3000);

  //const document = SwaggerModule.createDocument(app, {});
  //SwaggerModule.setup('/api', app, document);
}
bootstrap();
