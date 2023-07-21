import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@Inject('REDIS_CONNECTION') private readonly redis: Redis) { }

    async setValue(key: string, value: string): Promise<void> {
        await this.redis.set(key, value);
    }

    async getValue(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async setValueWithExpiry(key: string, value: any, seconds: number): Promise<void> {
        await this.redis.set(key, value);
        await this.redis.expire(key, seconds);
    }
}

