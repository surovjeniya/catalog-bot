import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { InviteUserController } from './invite-user.controller';
import { InviteUserService } from './invite-user.service';

@Module({
  imports: [UserModule],
  controllers: [InviteUserController],
  providers: [InviteUserService],
  exports: [],
})
export class InviteUserModule {}
