import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PUBSUB',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',port: 6379
        },
      },
    ]),RedisModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
