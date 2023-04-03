import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { LoggerService } from 'src/logger/logger.service';
import { startMenu } from 'src/menu/start.menu';

@Update()
export class MenuUpdate {
  constructor(private readonly loggerService: LoggerService) {}

  @Action(Commands.menu)
  async getMenu(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands.menu,
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username ? ctx.from.username : null,
    });
    this.clearSession(ctx);
    await ctx.reply('Меню:', {
      reply_markup: {
        inline_keyboard: startMenu(ctx),
      },
    });
  }

  clearSession(ctx: TelegrafContext) {
    ctx.session.action = null;
    ctx.session.create_service_ctx = {
      chatId: null,
      description: null,
      image: null,
      categorySlug: null,
      price: null,
      serviceId: null,
    };
  }
}
