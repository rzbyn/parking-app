import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get<number>('PORT', 3000);

  await app.listen(PORT);

  logger.log(`Application is listening on port ${PORT}`);
  logger.log(`http://localhost:${PORT}`);
}
bootstrap();
