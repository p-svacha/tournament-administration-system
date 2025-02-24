import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allow Cross-Origin-Requests
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
