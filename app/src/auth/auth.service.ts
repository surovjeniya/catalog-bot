import { Injectable } from '@nestjs/common';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SellersHubBotApi } from 'src/utils/api-class.utils';

@Injectable()
export class AuthService {
  constructor(private readonly api: SellersHubBotApi) {}

  async getContact(ctx: TelegrafContext) {
    const register = await this.registration(ctx);
  }

  generatePass() {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const passwordLength = 12;
    let password = '';
    for (let i = 0; i <= passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }

  async registration(ctx: TelegrafContext) {
    const password = this.generatePass();
    const user = await this.api.registerWithTelegram({
      phone_number: ctx.update.message.contact.phone_number,
      registered_from_bot: true,
      telegram_id: ctx.from.id,
      username: ctx.from.username ? ctx.from.username : `Member${ctx.from.id}`,
      password,
    });
    if (user) {
      ctx.session.jwt = user.jwt;
      await ctx.reply(
        `Спасибо за регистрацию. Ваши данные для входа на сайт:\nТелефон: ${ctx.update.message.contact.phone_number}\nПароль: ${password}`,
        {
          reply_markup: {
            remove_keyboard: true,
          },
        },
      );
      await ctx.reply('Для перехода в главное меню нажмите кнопку ниже', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Перейти в главное меню', callback_data: 'menu' }],
          ],
        },
      });
    }
  }
}
