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
    await ctx.reply(
      '✍️ Для создания индивидуального заказа отправьте техническое задание в нашу поддержку (https://t.me/nnaastyyaa)Если у вас нет технического задания, то можете так же написать нам (https://t.me/nnaastyyaa) и мы поможем его создать',
    );
  }

  @Action(Commands.personal)
  async personalAction(@Ctx() ctx: TelegrafContext) {
    ctx.session.action = Actions['personal-specialist'];
    await ctx.reply(
      '✍️Для создания индивидуального заказа отправьте техническое задание в нашу поддержку (https://t.me/nnaastyyaa).\nЕсли у вас нет технического задания, то можете так же написать нам (https://t.me/nnaastyyaa) и мы поможем его создать',
    );
  }
}
