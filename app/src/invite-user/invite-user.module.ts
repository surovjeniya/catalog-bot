import { Module } from '@nestjs/common';
import { InviteUserController } from './invite-user.controller';
import { InviteUserService } from './invite-user.service';

@Module({
  imports: [],
  controllers: [InviteUserController],
  providers: [InviteUserService],
  exports: [],
})
export class InviteUserModule {}
