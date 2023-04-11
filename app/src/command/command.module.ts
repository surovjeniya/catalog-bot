import { Module } from '@nestjs/common';
import { Api } from 'src/utils/api.utils';
import { CommandService } from './command.service';
import { CommandUpdate } from './command.update';

@Module({
  imports: [],
  providers: [CommandService, CommandUpdate, Api],
})
export class CommandModule {}
