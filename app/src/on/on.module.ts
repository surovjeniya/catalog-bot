import { Module } from '@nestjs/common';
import { OnService } from './on.service';
import { OnUpdate } from './on.update';

@Module({
  imports: [],
  providers: [OnUpdate, OnService],
})
export class OnModule {}
