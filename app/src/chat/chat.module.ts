import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { ChatService } from './chat.service';
import { ChatUpdate } from './chat.update';

@Module({
  imports: [LoggerModule],
  exports: [],
  providers: [ChatService, ChatUpdate],
})
export class ChatModule {}
