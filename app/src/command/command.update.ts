import { Command, Ctx, Update } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf-context.interface';
import { Api } from 'src/utils/api.utils';

@Update()
export class CommandUpdate {
  constructor(private readonly api: Api) {}

  clearSessionAction(ctx: TelegrafContext) {
    ctx.session.action = null;
  }

  @Command('start')
  async start(@Ctx() ctx: TelegrafContext) {
    this.clearSessionAction(ctx);
    console.log(ctx);
  }

  @Command('signout')
  async signOut(@Ctx() ctx: TelegrafContext) {}

  @Command('catalog')
  async catalog(@Ctx() ctx: TelegrafContext) {}
}
