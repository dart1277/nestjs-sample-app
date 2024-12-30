/* istanbul ignore next */
import { NestFactory } from '@nestjs/core';
/* istanbul ignore next */
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';

/* istanbul ignore next */
async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // strip extra properties
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}

/* istanbul ignore next */
bootstrap();
