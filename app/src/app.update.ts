import { ConfigService } from '@nestjs/config';
import { Action, Command, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from './enum/commands.enum';
import { TelegrafContext } from './interface/telegraf.context';
import { getStartMenu } from './utils/start-menu.utils';
import { SellersHubBotApi } from './utils/api-class.utils';
import { getInlineButtons } from './utils/get-buttons.utils';
import { getStartMessage } from './message';

@Update()
export class AppUpdate {
  constructor(
    private readonly configService: ConfigService,
    private readonly api: SellersHubBotApi,
  ) {}

  @Action(Commands.start)
  async startAction(@Ctx() ctx: TelegrafContext) {
    const { first_name, id, is_bot, language_code, last_name, username } =
      ctx.session.from;
    ctx.session.from = {
      first_name,
      id,
      is_bot,
      language_code,
      last_name,
      username,
    };
    ctx.session.action = null;
    ctx.session.create_service_ctx = null;
    const startMenu = getStartMenu(ctx);
    await ctx.replyWithPhoto(
      'https://sellershub.ru/api/uploads/custom_resized_fa37f5c1_8d70_4305_8ba8_13d59adda724_6723c926c7.jpg?updated_at=2023-03-10T11:42:06.123Z',
    );
    await ctx.replyWithHTML(
      getStartMessage(ctx),
      getInlineButtons(startMenu, 1),
    );
  }

  @Command(Commands.signout)
  async singOut(@Ctx() ctx: TelegrafContext) {
    ctx.session.jwt = null;
    await ctx.reply(
      'Вы вышли.',
      getInlineButtons([
        {
          data: 'start',
          text: 'Перейти в главное меню.',
        },
      ]),
    );
  }

  @Command(Commands.start)
  async start(@Ctx() ctx: TelegrafContext) {
    const { first_name, id, is_bot, language_code, last_name, username } =
      ctx.from;
    ctx.session.from = {
      first_name,
      id,
      is_bot,
      language_code,
      last_name,
      username,
    };
    ctx.session.action = null;
    ctx.session.create_service_ctx = null;
    const startMenu = getStartMenu(ctx);
    await ctx.replyWithPhoto(
      'https://sellershub.ru/api/uploads/custom_resized_fa37f5c1_8d70_4305_8ba8_13d59adda724_6723c926c7.jpg?updated_at=2023-03-10T11:42:06.123Z',
    );
    await ctx.replyWithHTML(
      getStartMessage(ctx),
      getInlineButtons(startMenu, 1),
    );
  }
}
