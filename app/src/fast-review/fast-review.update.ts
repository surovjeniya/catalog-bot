import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Actions } from 'src/enum/actions.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { Utm } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SellersHubBotApi } from 'src/utils/api-class.utils';

@Update()
export class FastReviewUpdate {
  constructor(
    private readonly sellersHubBotApi: SellersHubBotApi,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  @Action(/(?<=review-rating\/).*/)
  async setReviewRating(@Ctx() ctx: TelegrafContext) {
    if (ctx.session.action === Actions.review) {
      ctx.session.fast_review.username = ctx.from.username
        ? ctx.from.username
        : ctx.from.id;
      ctx.session.fast_review.rating = ctx.match[0];
      if (
        ctx.session.fast_review.message &&
        ctx.session.fast_review.rating &&
        ctx.session.fast_review.username
      ) {
        const review = await this.sellersHubBotApi.createReview(ctx);
        await ctx.reply(
          'Спасибо за ваш отзыв.\nДля перехода в меню нажмите кнопку ниже.',
          {
            reply_markup: {
              inline_keyboard: [
                [{ text: 'Перейти в меню', callback_data: 'menu' }],
              ],
            },
          },
        );

        const user = await this.userService.findOne({
          telegram_id: ctx.from.id,
        });

        if (user && !user.utm) {
          //@ts-ignore
          await this.userService.update(user.id, { utm: Utm.fast_review });
        }
      }
    }
    ctx.session.action = null;
  }
}
