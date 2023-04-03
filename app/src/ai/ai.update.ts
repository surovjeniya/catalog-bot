import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { AiService } from './ai.service';

@Update()
export class AiUpdate {
  constructor(private readonly aiService: AiService) {}

  @Action(Commands.ai)
  async getAi(@Ctx() ctx: TelegrafContext) {
    const ai = await this.aiService.getAi(ctx);
  }
}
