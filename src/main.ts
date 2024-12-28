/* istanbul ignore next */
import { NestFactory } from '@nestjs/core';
/* istanbul ignore next */
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/* istanbul ignore next */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}

/* istanbul ignore next */
bootstrap();

