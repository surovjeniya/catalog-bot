import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { PersonalService } from './personal.service';
import { PersonalUpdate } from './personal.update';

@Module({
  imports: [LoggerModule],
  providers: [PersonalUpdate, PersonalService],
})
export class PersonalModule {}
