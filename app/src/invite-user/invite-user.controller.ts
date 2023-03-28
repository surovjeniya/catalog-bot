import { Body, Controller, Post } from '@nestjs/common';
import { InviteUserDto } from './dto/invite-user.dto';
import { InviteUserService } from './invite-user.service';

@Controller('invite-user')
export class InviteUserController {
  constructor(private readonly inviteUserService: InviteUserService) {}

  @Post('send-message')
  async inviteUser(@Body() inviteUserDto: InviteUserDto) {
    return await this.inviteUserService.inviteUser(inviteUserDto);
  }
}
