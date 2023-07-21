import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Account ,Profile} from './app.interface';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_profiles' })
  getProfiles(): Profile[] {
    return this.appService.getProfiles();
  }

  @EventPattern({ cmd: 'create_account' })
  createProfile(account: Account): Profile {
    const { id, name } = account;
    return this.appService.createProfile({ id, name });
  }
}
