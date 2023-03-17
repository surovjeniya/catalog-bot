import { Action, Command, Ctx, Update } from 'nestjs-telegraf';
import { Actions } from 'src/enum/actions.enum';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';

@Update()
export class PersonalUpdate {
  constructor() {}

  @Action(Commands.personal)
  async personalAction(@Ctx() ctx: TelegrafContext) {
    ctx.session.action = Actions['personal-specialist'];
    await ctx.replyWithHTML(
      `Для создания индивидуального заказа необходимо отправить техническое задание в нашу <a href="https://t.me/sellershubanastasiya">поддержку</a>. Если у вас нет технического задания, <a href="https://t.me/sellershubanastasiya">мы</a> поможем его составить.`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '↩️ Вернуться в меню', callback_data: Commands.menu }],
          ],
        },
      },
    );
  }
}
