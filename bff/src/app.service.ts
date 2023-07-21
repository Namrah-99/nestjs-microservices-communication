import { Inject, Injectable, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Account, Profile, User } from './app.interface';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AppService {

  constructor(
    @Inject('PUBSUB')
    private readonly client: ClientProxy,
  ) {}

  @Get('accounts')
  async getAccounts(): Promise<Account[]> {
    const users = await this.client
      .send<User[]>({ cmd: 'get_users' }, { page: 1, items: 10 })
      .toPromise();
    const profiles = await this.client
      .send<Profile[]>({ cmd: 'get_profiles' }, { ids: users.map((u) => u.id) })
      .toPromise();
      const data = users.map<Account>((u) => ({
        ...u,
        ...profiles.find((p) => p.id === u.id),
      }));
      // await this.redisservice.setValueWithExpiry(data[index].id.toString(), JSON.stringify(data[index]), 3600);
    return data;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
