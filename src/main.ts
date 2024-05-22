import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // 여기에 URL을 넣어도 된다.
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
