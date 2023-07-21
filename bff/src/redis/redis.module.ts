import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { Redis, RedisOptions } from 'ioredis';

@Module({
  imports: [],
  providers: [
    {
      provide: 'REDIS_CONNECTION',
      useFactory: () => {
        const redisOptions: RedisOptions = {
          host: '127.0.0.1',
          port: 6379,
        };
        return new Redis(redisOptions);
      },
    },
  ],
  exports: ['REDIS_CONNECTION'],
})
export class RedisModule { }
