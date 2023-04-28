import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { Utm } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { SellersHubBotApi } from 'src/utils/api-class.utils';

@Injectable()
export class ViewWebSiteService {
  constructor(
    private readonly configService: ConfigService,
    private readonly api: SellersHubBotApi,
    private readonly userService: UserService,
  ) {}

  async getWebSite(ctx: TelegrafContext) {
    const service = await this.api.getService(
      ctx.session.download_price.serviceId,
      ctx,
    );

    const { slug: categorySlug } =
      service.data.attributes.service_categories.data[0].attributes;
    const { slug: parentCategorySlug } =
      service.data.attributes.service_categories.data[0].attributes
        .parent_category.data.attributes;
    const serviceUrl = `${this.configService.get(
      'WEB',
    )}/catalog/${parentCategorySlug}/${categorySlug}/${service.data.id}`;

    const user = await this.userService.findOne({
      telegram_id: String(ctx.from.id),
    });
    if (!user) {
      await this.userService.create({
        first_name: ctx.from.first_name ? ctx.from.first_name : null,
        language_code: ctx.from.language_code,
        is_bot: ctx.from.is_bot,
        last_name: ctx.from.last_name ? ctx.from.language_code : null,
        username: ctx.from.username ? ctx.from.username : null,
        telegram_id: String(ctx.from.id),
        utm: Utm.download_price,
      });
    }
    await ctx.reply(
      `Добрый день,${ctx.from.first_name ? ctx.from.first_name : ''}`,
    );
    await ctx.reply(serviceUrl);
    await ctx.reply(
      service.data.attributes.profile.data.attributes.portfolio_url,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Вернуться в меню', callback_data: 'menu' }],
          ],
        },
      },
    );
  }
}
