import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Actions } from 'src/enum/actions.enum';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { getInlineButtons } from 'src/utils/get-buttons.utils';

@Update()
export class SignInUpdate {
  constructor(private readonly sellersHubBotApi: SellersHubBotApi) {}

  @Action(Commands['sign-in'])
  async signInAction(@Ctx() ctx: TelegrafContext) {
    ctx.session.action = Actions['sign-in'];
    this.clearLoginData(ctx);
    await ctx.reply('Введите email: 👇', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '↩️ Вернуться в главное меню',
              callback_data: Commands.start,
            },
          ],
        ],
      },
    });
  }

  @Action('/sign-in/continue')
  async signIn(@Ctx() ctx: TelegrafContext) {
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
            data: 'start',
            text: 'Перейти в главное меню.',
          },
        ]),
      );
    }
  }

  clearLoginData(ctx: TelegrafContext) {
    ctx.session.login_data = {
      identifier: '',
      password: '',
      validateEmail: false,
    };
    return 1;
  }
}
