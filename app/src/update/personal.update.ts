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
    console.log(ctx.session.action);
  }

  @Action(Commands.personal)
  async personalAction(@Ctx() ctx: TelegrafContext) {
    ctx.session.action = Actions['personal-specialist'];
    console.log(ctx.session.action);
  }
}
