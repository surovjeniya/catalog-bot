import { Command, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from './enum/commands.enum';
import { TelegrafContext } from './interface/telegraf.context';
import { getInlineButtons } from './utils/get-buttons.utils';
import { startMessage } from './message';
import { startMenu } from './menu/start.menu';
import { UserService } from './user/user.service';
import { LoggerService } from './logger/logger.service';
import { Utm } from './user/user.entity';
import { FastReviewService } from './fast-review/fast-review.service';
import { Actions } from './enum/actions.enum';
import { SellersHubBotApi } from './utils/api-class.utils';
import { DownloadPriceService } from './download-price/download-price.service';
import { ViewWebSiteService } from './view-web-site/view-web-site.service';

@Update()
export class AppUpdate {
  constructor(
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
    private readonly fastReviewService: FastReviewService,
    private readonly api: SellersHubBotApi,
    private readonly downloadPriceService: DownloadPriceService,
    private readonly viewWebSiteService: ViewWebSiteService,
  ) {}

  // @Action(Commands.start)
  // async startAction(@Ctx() ctx: TelegrafContext) {
  //   const { first_name, id, is_bot, language_code, last_name, username } =
  //     ctx.session.from;
  //   ctx.session.from = {
  //     first_name,
  //     id,
  //     is_bot,
  //     language_code,
  //     last_name,
  //     username,
  //   };
  //   ctx.session.action = null;
  //   ctx.session.create_service_ctx = {
  //     chatId: null,
  //     description: null,
  //     image: null,
  //     categorySlug: null,
  //     price: null,
  //     serviceId: null,
  //   };
  //   await ctx.replyWithPhoto(
  //     'https://sellershub.ru/api/uploads/custom_resized_fa37f5c1_8d70_4305_8ba8_13d59adda724_6723c926c7.jpg?updated_at=2023-03-10T11:42:06.123Z',
  //     {
  //       caption: startMessage(ctx),
  //       reply_markup: {
  //         inline_keyboard: startMenu(ctx),
  //       },
  //       parse_mode: 'HTML',
  //     },
  //   );
  // }

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
          data: 'menu',
          text: 'Перейти в главное меню.',
        },
      ]),
    );
  }

  @Command(Commands.start)
  async start(@Ctx() ctx: TelegrafContext) {
    const { first_name, id, is_bot, language_code, last_name } = ctx.from;
    ctx.session.from = {
      first_name,
      id,
      is_bot,
      language_code,
      last_name,
      username: ctx.from.username ? ctx.from.username : null,
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

    const utm = ctx.update.message.text.split(' ')[1];
    if (utm && utm.match('download_price')) {
      const serviceId = utm.split('_')[2];
      ctx.session.download_price = {
        serviceId: Number(serviceId),
      };
      ctx.session.action = Actions['download_price'];
      const downloadPrice = await this.downloadPriceService.getPrice(ctx);
    }
    if (utm && utm.match('view_web_site')) {
      const serviceId = utm.split('_')[2];
      ctx.session.view_web_site = {
        serviceId: Number(serviceId),
      };
      ctx.session.action = Actions.view_web_site;
      const website = await this.viewWebSiteService.getWebSite(ctx);
    }
    if (utm && utm.match('fast_review')) {
      const serviceId = utm.split('_')[2];
      ctx.session.fast_review = {
        message: null,
        rating: null,
        username: null,
        serviceId: Number(serviceId),
      };
      ctx.session.action = Actions.review;

      const fastReview = await this.fastReviewService.createFastReview(
        ctx,
        Number(serviceId),
      );
    }

    //@ts-ignore
    const user = await this.userService.findOne({ telegram_id: id });

    if (!user) {
      await this.userService.create({
        first_name,
        language_code,
        is_bot,
        last_name,
        username: ctx.from.username ? ctx.from.username : null,
        //@ts-ignore
        telegram_id: id,
        utm: utm && (<any>Object).values(Utm).includes(utm) ? utm : null,
      });
    }

    if (
      !utm ||
      (utm && !utm.match('fast_review')) ||
      (utm && !utm.match('download_price')) ||
      (utm && !utm.match('view_web_site'))
    ) {
      // 1.check user by tg_id
      const user = await this.api.getUserByTelegramId(ctx.from.id);
      // 2.if user login user ,save jwt to session
      // if !user register user and save jwt
      if (!user) {
        await ctx.reply(
          'Для мгновенной регистрации нам необходим ваш номер телефона.\nПожалуйста, нажмите на кнопку ниже.',
          {
            reply_markup: {
              resize_keyboard: true,
              keyboard: [
                [
                  {
                    text: 'Показать контакт',
                    request_contact: true,
                  },
                ],
              ],
            },
          },
        );
      }
      if (user || ctx.session.jwt) {
        if (
          (utm && utm.match('download_price')) ||
          (utm && utm.match('view_web_site')) ||
          (utm && utm.match('fast_review'))
        ) {
          return '';
        } else {
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
    }
  }
}
