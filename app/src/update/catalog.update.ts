import { ConfigService } from '@nestjs/config';
import { Action, Command, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { LoggerService } from 'src/logger/logger.service';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { getInlineButtons } from '../utils/get-buttons.utils';

@Update()
export class CatalogUpdate {
  constructor(
    private readonly configService: ConfigService,
    private readonly api: SellersHubBotApi,
    private readonly loggerService: LoggerService,
  ) {}
  @Command(Commands.catalog)
  async catalogCommand(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands.catalog,
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username,
    });
    const categories = await this.api.getCategories(ctx);
    const parentCategories = categories.data.filter(
      (category) => category.attributes.parent_category.data === null,
    );
    const menu = parentCategories.map((item) => {
      return {
        text: item.attributes.name,
        data: `/child-categories/${item.attributes.slug}`,
      };
    });
    await ctx.reply('Выберите категорию:', getInlineButtons(menu, 1));
    // await ctx.reply('Для просмотра каталога нажмите кнопку ниже 👇', {
    //   reply_markup: {
    //     inline_keyboard: [
    //       [
    //         {
    //           text: 'Посмотреть каталог 🗃️',
    //           web_app: {
    //             url: `${this.configService.get('API').split('api')[0]}/catalog`,
    //           },
    //         },
    //       ],
    //     ],
    //   },
    // });
  }

  @Action(Commands.catalog)
  async catalogAction(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands.catalog,
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username,
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
    // await ctx.reply('Для просмотра каталога нажмите кнопку ниже 👇', {
    //   reply_markup: {
    //     inline_keyboard: [
    //       [
    //         {
    //           text: 'Посмотреть каталог 🗃️',
    //           web_app: {
    //             url: `${this.configService.get('API').split('api')[0]}/catalog`,
    //           },
    //         },
    //       ],
    //     ],
    //   },
    // });
  }

  @Action(/(?<=child-categories\/).*/)
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

  // @Action(/(?<=child-category\/).*/)
  // async getTops(@Ctx() ctx: TelegrafContext) {
  //   const slug = ctx.match.input.split('/')[2];
  //   const menu = [
  //     // {
  //     //   text: 'Топ дешевых',
  //     //   data: `top/cheap/${slug}`,
  //     // },
  //     // {
  //     //   text: 'Топ дорогих',
  //     //   data: `top/expensive/${slug}`,
  //     // },
  //     {
  //       text: 'Топ месяца',
  //       data: `top/month/${slug}`,
  //     },
  //   ];
  //   await ctx.reply('Выберите вариант:', getInlineButtons(menu, 1));
  // }

  // @Action(/(?<=top\/).*/)
  // async getTop(@Ctx() ctx: TelegrafContext) {
  //   const match = ctx.match.input.split('/');
  //   const top = match[1];
  //   const slug = match[2];
  //   if (top === 'cheap') {
  //     const services = await this.api.getServices(ctx);
  //     if (!services.data.length) {
  //       await ctx.reply('Услуги не найдены:');
  //     }
  //     await ctx.reply('Топ дешевых:');
  //   }
  //   if (top === 'expensive') {
  //     const services = await this.api.getServices(ctx);
  //     if (!services.data.length) {
  //       await ctx.reply('Услуги не найдены:');
  //     }
  //     await ctx.reply('Топ дорогих:');
  //   }
  //   if (top === 'month') {
  //     const services = await this.api.getTopOfMonthServices(ctx, slug);
  //     if (!services.data.length) {
  //       await ctx.reply('Услуги не найдены:');
  //     }
  //     const menu = services.data.map((service) => {
  //       return {
  //         text: service.name,
  //         data: `/service-id/${service.id}`,
  //       };
  //     });
  //     await ctx.reply('Топ этого месяца:', getInlineButtons(menu, 1));
  //   }
  // }

  // @Action(/(?<=service-id\/).*/)
  // async getServiceById(@Ctx() ctx: TelegrafContext) {
  //   const id = ctx.match.input.split('/')[2];
  //   const service = await this.api.getService(+id, ctx);

  //   let photo = null;
  //   const category = await this.api.getCategoryById(
  //     ctx,
  //     service.data.attributes.service_categories.data[0].id,
  //   );
  //   const serviceLink = `https://sellershub.ru/catalog/${category.data.attributes.parent_category.data.attributes.slug}/${category.data.attributes.slug}/${id}`;
  //   service.data.attributes.previews.data
  //     ? (photo =
  //         this.configService.get('API') +
  //         service.data.attributes.previews.data[0].attributes.formats.thumbnail
  //           .url)
  //     : (photo =
  //         'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Flandscape-of-morning-fog-and-mountains-with-hot-air-balloons-at-sunrise_335224-794.jpg&imgrefurl=https%3A%2F%2Fru.freepik.com%2Fpopular-photos&tbnid=sznE3340O1YzhM&vet=12ahUKEwjQz7Hq8dD9AhXQtioKHcSTDp0QMygFegUIARDnAQ..i&docid=PPTf6uzbFHAatM&w=626&h=417&q=фото&client=safari&ved=2ahUKEwjQz7Hq8dD9AhXQtioKHcSTDp0QMygFegUIARDnAQ');

  //   await ctx.replyWithPhoto(photo);
  //   await ctx.replyWithHTML(`
  //   <b>${service.data.attributes.name}</b>
  //   ${service.data.attributes.description.replace(/<[^>]*>?/gm, '')}
  //   `);
  //   await ctx.replyWithHTML(
  //     `<a href="${serviceLink}">Посмотреть подробную информацию на сайте:</a>`,
  //   );

  //   if (ctx.session.jwt) {
  //     const {
  //       contact_email,
  //       contact_telegram,
  //       contact_instagram,
  //       contact_viber,
  //       contact_vk,
  //       contact_whatsup,
  //       phone_number,
  //     } = service.data.attributes.profile.data.attributes;
  //     ctx.session.profile_contacts = {
  //       contact_email,
  //       contact_telegram,
  //       contact_instagram,
  //       contact_viber,
  //       contact_vk,
  //       contact_whatsup,
  //       phone_number,
  //     };
  //     await ctx.reply(
  //       'Посмотреть контакты специалиста',
  //       getInlineButtons([
  //         {
  //           text: 'Посмотреть',
  //           data: 'show-profile-contacts',
  //         },
  //       ]),
  //     );
  //   }
  // }

  // @Action('show-profile-contacts')
  // async showProfileContacts(@Ctx() ctx: TelegrafContext) {
  //   console.log(ctx.session.profile_contacts);
  // }
}
