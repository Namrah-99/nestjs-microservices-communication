import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Listen on port 3001 for HTTP requests
  await app.listen(3001);

  // Create a microservice with Redis transport on port 6379
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  await microservice.listen();

  console.log('HTTP server listening on port 3001');
  console.log('Microservice listening on Redis port 6379');
}

bootstrap();