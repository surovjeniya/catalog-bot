import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { SupportService } from './support.service';
import { SupportUpdate } from './support.update';

@Module({
  imports: [LoggerModule],
  providers: [SupportService, SupportUpdate],
})
export class SupportModule {}
