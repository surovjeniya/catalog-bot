import { Action, Command, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from './enum/commands.enum';
import { TelegrafContext } from './interface/telegraf.context';
import { getInlineButtons } from './utils/get-buttons.utils';
import { startMessage } from './message';
import { startMenu } from './menu/start.menu';
import { UserService } from './user/user.service';
import { LoggerService } from './logger/logger.service';

@Update()
export class AppUpdate {
  constructor(
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
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
    ctx.session.create_service_ctx = {
      chatId: null,
      description: null,
      image: null,
      categorySlug: null,
      price: null,
      serviceId: null,
    };
    await ctx.replyWithPhoto(
      'https://sellershub.ru/api/uploads/custom_resized_fa37f5c1_8d70_4305_8ba8_13d59adda724_6723c926c7.jpg?updated_at=2023-03-10T11:42:06.123Z',
      {
        caption: startMessage(ctx),
        reply_markup: {
          inline_keyboard: startMenu(ctx),
        },
        parse_mode: 'HTML',
      },
    );
  }

  @Command(Commands.signout)
  async singOut(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands.signout,
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username,
    });
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
    ctx.session.create_service_ctx = {
      chatId: null,
      description: null,
      image: null,
      categorySlug: null,
      price: null,
      serviceId: null,
    };
    const user = await this.userService.findOne({ telegram_id: id });
    if (!user) {
      await this.userService.create({
        first_name,
        language_code,
        is_bot,
        last_name,
        username,
        telegram_id: id,
      });
    }
    await ctx.replyWithPhoto(
      'https://sellershub.ru/api/uploads/custom_resized_fa37f5c1_8d70_4305_8ba8_13d59adda724_6723c926c7.jpg?updated_at=2023-03-10T11:42:06.123Z',
      {
        caption: startMessage(ctx),
        reply_markup: {
          inline_keyboard: startMenu(ctx),
        },
        parse_mode: 'HTML',
      },
    );
  }
}
