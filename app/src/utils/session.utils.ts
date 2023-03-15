import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { Telegraf } from 'telegraf';

@Injectable()
export class SessionUtils {
  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}

  async getBot() {
    return this.bot.context.session;
  }
}
