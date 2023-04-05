import { Action, Ctx, Update } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SellersHubBotApi } from 'src/utils/api-class.utils';

@Update()
export class FastReviewUpdate {
  constructor(private readonly sellersHubBotApi: SellersHubBotApi) {}

  @Action(/(?<=review-rating\/).*/)
  async setReviewRating(@Ctx() ctx: TelegrafContext) {
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
    }
  }
}
