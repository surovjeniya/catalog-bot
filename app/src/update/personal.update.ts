import { Action, Command, Ctx, Update } from 'nestjs-telegraf';
import { Actions } from 'src/enum/actions.enum';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';

@Update()
export class PersonalUpdate {
  constructor() {}

  @Command(Commands.personal)
  async personalCommand(@Ctx() ctx: TelegrafContext) {
    ctx.session.action = Actions['personal-specialist'];
    await ctx.replyWithHTML(
      '✍️ Для создания индивидуального заказа отправьте техническое задание в нашу <a href="https://t.me/sellershubanastasiya">поддержку</a>.Если у вас нет технического задания, то можете так же написать <a href="https://t.me/nnaastyyaa">нам</a> и мы поможем его создать.',
    );
  }

  @Action(Commands.personal)
  async personalAction(@Ctx() ctx: TelegrafContext) {
    ctx.session.action = Actions['personal-specialist'];
    await ctx.replyWithHTML(
      '✍️ Для создания индивидуального заказа отправьте техническое задание в нашу <a href="https://t.me/sellershubanastasiya">поддержку</a>.Если у вас нет технического задания, то можете так же написать <a href="https://t.me/nnaastyyaa">нам</a> и мы поможем его создать.',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '↩️ Вернуться в меню', callback_data: Commands.start }],
          ],
        },
      },
    );
  }
}
