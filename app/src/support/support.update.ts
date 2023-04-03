import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SupportService } from './support.service';

@Update()
export class SupportUpdate {
  constructor(private readonly supportService: SupportService) {}

  @Action(Commands.support)
  async getSupport(@Ctx() ctx: TelegrafContext) {
    const support = await this.supportService.getSupport(ctx);
  }
}
