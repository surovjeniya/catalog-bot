import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { Telegraf } from 'telegraf';
import { InviteUserDto } from './dto/invite-user.dto';
import { SearchFulfillmentDto } from './dto/search-fulfillment.dto';

@Injectable()
export class InviteUserService {
  constructor(@InjectBot() private readonly bot: Telegraf<TelegrafContext>) {}

  async searchFulfillment(dto: SearchFulfillmentDto) {
    return await this.bot.telegram.sendMessage(671646655, JSON.stringify(dto));
  }

  async inviteUser({ name, phone, telegram_username, url }: InviteUserDto) {
    return await this.bot.telegram.sendMessage(
      54452505,
      `\nИмя: ${name},\n
       Номер телефона:${phone},\n
       Telegram: ${telegram_username ? telegram_username : 'отсутствует'}\n,
       url: ${url ? url : 'отсутствует'}`,
    );
  }
}
