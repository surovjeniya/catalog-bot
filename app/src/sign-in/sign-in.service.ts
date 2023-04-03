import { Injectable } from '@nestjs/common';
import { Actions } from 'src/enum/actions.enum';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { LoggerService } from 'src/logger/logger.service';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { getInlineButtons } from 'src/utils/get-buttons.utils';

@Injectable()
export class SignInService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly sellersHubBotApi: SellersHubBotApi,
  ) {}

  clearLoginData(ctx: TelegrafContext) {
    ctx.session.login_data = {
      identifier: '',
      password: '',
      validateEmail: false,
    };
    return 1;
  }

  async signInAction(ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands['sign-in'],
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username ? ctx.from.username : null,
    });
    ctx.session.action = Actions['sign-in'];
    this.clearLoginData(ctx);
    await ctx.reply('Введите email: 👇', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '↩️ Вернуться в главное меню',
              callback_data: Commands.menu,
            },
          ],
        ],
      },
    });
  }

  async signIn(ctx: TelegrafContext) {
    const { identifier, password } = ctx.session.login_data;
    const signInData = await this.sellersHubBotApi.signIn(
      ctx,
      identifier,
      password,
    );
    if (signInData && signInData.jwt) {
      ctx.session.action = null;
      ctx.session.jwt = signInData.jwt;
      this.clearLoginData(ctx);
      await ctx.reply(
        'Вы вошли.',
        getInlineButtons([
          {
            data: Commands.menu,
            text: '↩️ Вернуться в главное меню.',
          },
        ]),
      );
    }
  }
}
