import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { LoggerService } from 'src/logger/logger.service';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { getInlineButtons } from 'src/utils/get-buttons.utils';

@Injectable()
export class CatalogService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly api: SellersHubBotApi,
    private readonly configService: ConfigService,
  ) {}

  async getCatalog(ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands.catalog,
      telegram_id: ctx.from.id,
      username: ctx.from.username ? ctx.from.username : null,
    });
    const categories = await this.api.getCategories(ctx);
    const parentCategories = categories.data
      .filter((category) => category.attributes.parent_category.data === null)
      .sort((a, b) =>
        a.attributes.sort_index < b.attributes.sort_index ? 1 : -1,
      );
    const menu = parentCategories.map((item) => {
      return {
        text: item.attributes.name,
        data: `/child-categories/${item.attributes.slug}`,
      };
    });
    menu.push({
      data: Commands.menu,
      text: '↩️ Вернуться в главное меню',
    });

    await ctx.reply('Выберите категорию:', getInlineButtons(menu, 1));
  }

  async getChildCategories(@Ctx() ctx: TelegrafContext) {
    const slug = ctx.match.input.split('/')[2];
    const categories = await this.api.getCategories(ctx);
    const childCategories = categories.data
      .filter((category) => category.attributes.parent_category.data !== null)
      .filter(
        (category) =>
          category.attributes.parent_category.data.attributes.slug === slug,
      )
      .sort((a, b) =>
        a.attributes.sort_index < b.attributes.sort_index ? 1 : -1,
      );

    const menuU = childCategories.map((item) => {
      return [
        {
          text: item.attributes.name,
          web_app: {
            url: `${
              this.configService.get('API').split('api')[0]
            }catalog/${slug}/${item.attributes.slug}`,
          },
        },
      ];
    });

    //@ts-ignore
    menuU.push([
      {
        //@ts-ignore
        callback_data: Commands.menu,
        text: '↩️ Вернуться в главное меню',
      },
    ]);

    await ctx.reply('Выберите подкатегорию:', {
      reply_markup: {
        inline_keyboard: menuU,
      },
    });
  }
}
