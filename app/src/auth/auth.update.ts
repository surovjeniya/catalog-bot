import { Action, Ctx, Update } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { AuthService } from './auth.service';

@Update()
export class AuthUpdate {
  constructor(
    private readonly authService: AuthService,
    private readonly api: SellersHubBotApi,
  ) {}

  @Action('auth')
  async auth(@Ctx() ctx: TelegrafContext) {
    await ctx.reply(
      'Добро пожаловать. Для продолжения работы кажмите кнопку "Показать контакт".',
      {
        reply_markup: {
          resize_keyboard: true,
          keyboard: [
            [
              {
                text: 'Показать контакт',
                request_contact: true,
              },
            ],
          ],
        },
      },
    );
  }
}
