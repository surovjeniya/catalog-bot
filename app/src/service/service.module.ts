import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { ServiceService } from './service.service';
import { ServiceUpdate } from './service.update';

@Module({
  imports: [LoggerModule],
  exports: [],
  providers: [ServiceService, ServiceUpdate, SellersHubBotApi],
})
export class ServiceModule {}
