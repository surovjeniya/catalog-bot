import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SellersHubBotApi } from 'src/utils/api-class.utils';

@Injectable()
export class FastReviewService {
  constructor(
    private readonly sellersHubBotApi: SellersHubBotApi,
    private readonly configService: ConfigService,
  ) {}

  async createFastReview(ctx: TelegrafContext, serviceId: number) {
    const service = await this.sellersHubBotApi.getService(serviceId, ctx);
    const { slug: categorySlug } =
      service.data.attributes.service_categories.data[0].attributes;
    const { slug: parentCategorySlug } =
      service.data.attributes.service_categories.data[0].attributes
        .parent_category.data.attributes;
    const serviceUrl = `${this.configService.get(
      'WEB',
    )}/catalog/${parentCategorySlug}/${categorySlug}/${serviceId}`;
    await ctx.replyWithHTML(
      `<a href="${serviceUrl}">${service.data.attributes.name}</a>`,
    );

    await ctx.reply(
      `Добрый день,${
        ctx.from.first_name
          ? ctx.from.first_name + '\nОпишите ваши впечатления об услуге 🔡'
          : 'дорогой пользователь.\nОпишите ваши впечатления об услуге 🔡'
      }`,
    );
  }
  async createReviewMessage(ctx: TelegrafContext, message: string) {
    ctx.session.fast_review.message = message;
    if (ctx.session.fast_review.message.length) {
      await ctx.reply('Отлично, оставьте оценку', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '⭐️',
                callback_data: `review-rating/1`,
              },
            ],
            [
              {
                text: '⭐️⭐️',
                callback_data: 'review-rating/2',
              },
            ],
            [
              {
                text: '⭐️⭐️⭐️',
                callback_data: 'review-rating/3',
              },
            ],
            [
              {
                text: '⭐️⭐️⭐️⭐️',
                callback_data: 'review-rating/4',
              },
            ],
            [
              {
                text: '⭐️⭐️⭐️⭐️⭐️',
                callback_data: 'review-rating/5',
              },
            ],
          ],
        },
      });
    }
  }
}
