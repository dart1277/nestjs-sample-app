/* istanbul ignore next */
import { NestFactory } from '@nestjs/core';
/* istanbul ignore next */
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { initializeTransactionalContext } from 'typeorm-transactional';
const cookieSession = require('cookie-session');

/* istanbul ignore next */
async function bootstrap() {
  //initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });
  // middleware applied globally cannot use DI, since it's not part of any module
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // strip extra properties
    }),
  );
  app.use(cookieSession({ keys: ['toSepcretCookieEncryptionKey123'] }));
  await app.listen(process.env.PORT ?? 3000);
}

/* istanbul ignore next */
bootstrap();
