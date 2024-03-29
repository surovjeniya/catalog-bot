import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { UserModule } from 'src/user/user.module';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';

@Module({
  imports: [UserModule, LoggerModule],
  providers: [MailingService],
  exports: [MailingService],
  controllers: [MailingController],
})
export class MailingModule {}
