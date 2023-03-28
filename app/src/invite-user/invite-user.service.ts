import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { Telegraf } from 'telegraf';
import { InviteUserDto } from './dto/invite-user.dto';

@Injectable()
export class InviteUserService {
  constructor(@InjectBot() private readonly bot: Telegraf<TelegrafContext>) {}

  async inviteUser({ name, phone, telegram_username }: InviteUserDto) {
    return await this.bot.telegram.sendMessage(
      54452505,
      `Имя: ${name},\n
       Номер телефона:${phone},\n
       Telegram: ${telegram_username ? telegram_username : 'отсутствует'}`,
    );
  }
}
