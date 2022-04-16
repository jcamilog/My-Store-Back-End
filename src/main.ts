import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // esta validacion no permite que lleguen campos no asignados en nuestro dto
      forbidNonWhitelisted: true, // este campo nos permite agregar un mensaje una alerta
    })
  );
  await app.listen(3000);
}
bootstrap();
