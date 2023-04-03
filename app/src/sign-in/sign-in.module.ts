import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { SignInService } from './sign-in.service';
import { SignInUpdate } from './sign-in.update';

@Module({
  imports: [LoggerModule],
  providers: [SignInService, SignInUpdate, SellersHubBotApi],
})
export class SignInModule {}
