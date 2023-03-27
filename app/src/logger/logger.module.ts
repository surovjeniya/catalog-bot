import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from './logger.entity';
import { LoggerService } from './logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoggerEntity])],
  exports: [LoggerService],
  providers: [LoggerService],
})
export class LoggerModule {}
