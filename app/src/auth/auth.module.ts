import { Module } from '@nestjs/common';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { AuthService } from './auth.service';
import { AuthUpdate } from './auth.update';

@Module({
  imports: [],
  providers: [AuthUpdate, AuthService, SellersHubBotApi],
  exports: [AuthService, AuthUpdate],
})
export class AuthModule {}
