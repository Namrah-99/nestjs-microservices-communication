import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Account, User } from './app.interface';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_users' })
  getUsers(): User[] {
    const data = this.appService.getUsers();
    return data;
  }

  @EventPattern({ cmd: 'create_account' })
  createUser(account: Account): User {
    const { id, login } = account;
    return this.appService.createUser({ id, login });
  }
}