import { Body, Controller, Post } from '@nestjs/common';
import { BidFulFillmentDto } from './dto/bid-fulfillment.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { SearchDesignerDto } from './dto/search-designer.dto';
import { SearchFulfillmentDto } from './dto/search-fulfillment.dto';
import { InviteUserService } from './invite-user.service';

@Controller('invite-user')
export class InviteUserController {
  constructor(private readonly inviteUserService: InviteUserService) {}

  @Post('send-message')
  async inviteUser(@Body() inviteUserDto: InviteUserDto) {
    return await this.inviteUserService.inviteUser(inviteUserDto);
  }

  @Post('search-fulfillment')
  async searchFulfillment(@Body() dto: SearchFulfillmentDto) {
    return await this.inviteUserService.searchFulfillment(dto);
  }

  @Post('bid-fulfillment')
  async bidFulfillment(@Body() dto: BidFulFillmentDto) {
    return await this.inviteUserService.bidFulfillment(dto);
  }

  @Post('search-designer')
  async searchDesigner(@Body() dto:SearchDesignerDto){
    return await this.inviteUserService.searchDesigner(dto)
  }
}
