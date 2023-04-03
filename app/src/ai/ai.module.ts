import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { AiService } from './ai.service';
import { AiUpdate } from './ai.update';

@Module({
  imports: [LoggerModule],
  exports: [],
  providers: [AiUpdate, AiService],
})
export class AiModule {}
