import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ctx } from 'nestjs-telegraf';
import { Actions } from 'src/enum/actions.enum';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import { getInlineButtons } from 'src/utils/get-buttons.utils';
import * as htmlParser from 'node-html-markdown';
import { LoggerService } from 'src/logger/logger.service';
import { UserService } from 'src/user/user.service';
import { Utm } from 'src/user/user.entity';

@Injectable()
export class ServiceService {
  constructor(
    private readonly sellersHubBotApi: SellersHubBotApi,
    private readonly configService: ConfigService,
    private readonly loggerService: LoggerService,
    private readonly userService: UserService,
  ) {}

  clearServiceData(ctx: TelegrafContext) {
    ctx.session.create_service_ctx = {
      categorySlug: null,
      chatId: null,
      description: null,
      image: null,
      price: null,
      serviceId: null,
    };
    return 1;
  }

  async createServiceAction(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands['create-service'],
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username ? ctx.from.username : null,
    });
    ctx.session.action = Actions['create-service'];
    this.clearServiceData(ctx);

    ctx.reply(
      'Выберите чат, в котором  хотите разместить услугу:\nдизайнеры инфографики или менеджеры ЛК?',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                callback_data: `/create-service/dizajnery/${this.configService.get(
                  'INFOGRAPHIC_CHAT_ID',
                )}`,
                text: 'Инфорграфика для марткеплейсов от Селлерсхаб',
              },
            ],
            [
              {
                callback_data: `/create-service/menedzhery/${this.configService.get(
                  'MANAGER_CHAT_ID',
                )}`,
                text: 'Менеджеры ЛК от Селлерсхаб',
              },
            ],
            [
              {
                text: '↩️ Вернуться в меню',
                callback_data: Commands.menu,
              },
            ],
          ],
        },
      },
    );
  }

  async createService(@Ctx() ctx: TelegrafContext) {
    const { jwt } = ctx.session;
    const matchArr = ctx.match.input.split('/');
    const slug = matchArr[matchArr.length - 2];
    const chatId = matchArr[matchArr.length - 1];
    ctx.session.create_service_ctx.chatId = chatId;
    ctx.session.create_service_ctx.categorySlug = slug;
    if (jwt) {
      await ctx.reply(
        'Создайте услугу через бот или опубликуйте существующую на sellershub.ru.',
        getInlineButtons(
          [
            {
              data: '/use-sh-profile/yes',
              text: 'Опубликовать через сайт',
            },
            {
              // data: '/use-sh-profile/no',
              data: 'create-via-bot',
              text: 'Опубликовать через ТГ',
            },
          ],
          1,
        ),
      );
    } else {
      await ctx.reply(
        'Для доступа к услугам с сайта Sellershub необходимо войти.',
        getInlineButtons(
          [
            {
              data: Commands['sign-in'],
              text: 'Войти?',
            },
            {
              data: 'create-via-bot',
              text: 'Создать услугу через бот.',
            },
          ],
          1,
        ),
      );
    }
  }

  async checkShProfile(@Ctx() ctx: TelegrafContext) {
    const { categorySlug } = ctx.session.create_service_ctx;
    const matchArr = ctx.match.input.split('/');
    const decision = matchArr[matchArr.length - 1];

    if (decision && decision === 'yes') {
      const profile = await this.sellersHubBotApi.getMyProfile(ctx);
      if (profile) {
        const { services } = profile.data.attributes;

        if (services.data.length) {
          const servicesByCategorySlug = services.data
            .filter((s) =>
              s.attributes.service_categories.data.find(
                (c) => c.attributes.slug === categorySlug,
              ),
            )
            .flat();
          if (servicesByCategorySlug.length) {
            const menu = servicesByCategorySlug.map((s) => {
              return {
                data: `/create-via-site/${s.id}`,
                text: s.attributes.name,
              };
            });
            await ctx.reply(
              'Выберите услугу для публикации.',
              getInlineButtons(menu, 1),
            );
          } else {
            await ctx.reply(
              'У вас нет созданных услуг на sellershub.ru.Для публикации с сайта необходимо:\n1.Зайти на сайт.\n2.Создать услугу в категории "Дизайнеры карточек товара" либо "Менеджеры личного кабинета"\n3.После создания услуги перейти в бот и разместить услугу используя функцию "опубликовать через сайт"',
              getInlineButtons(
                [
                  {
                    text: '↩️ Вернуться в главное меню.',
                    data: Commands.menu,
                  },
                ],
                1,
              ),
            );
          }
        } else {
          await ctx.reply(
            'У вас нет созданных услуг на sellershub.ru.Для публикации с сайта необходимо:\n1.Зайти на сайт.\n2.Создать услугу в категории "Дизайнеры карточек товара" либо "Менеджеры личного кабинета"\n3.После создания услуги перейти в бот и разместить услугу используя функцию "опубликовать через сайт"',
            getInlineButtons(
              [
                {
                  text: '↩️ Вернуться в главное меню.',
                  data: Commands.menu,
                },
              ],
              1,
            ),
          );
        }
      }
    }
    if (decision && decision === 'no') {
      await ctx.reply(
        'Создать услугу через бот?',
        getInlineButtons(
          [
            {
              text: 'Да',
              data: 'create-via-bot',
            },
            {
              text: '↩️ Вернуться в главное меню.',
              data: Commands.menu,
            },
          ],
          1,
        ),
      );
    }
  }

  async createServiceViaBot(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands['create-via-bot'],
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username,
    });
    await ctx.replyWithHTML(
      'Загрузите изображение,оно будет отображаться как превью в вашей услуге.(<b>не более одного изображения</b>) 📎.',
    );
  }

  async sendMessageToChat(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands['send-to-chat'],
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username,
    });

    const { serviceId, chatId, categorySlug } = ctx.session.create_service_ctx;

    let review = {
      data: [],
    };

    if (serviceId) {
      const service = await this.sellersHubBotApi.getService(+serviceId, ctx);
      review = service.data.attributes.review;
    }

    if (ctx.session.create_service_ctx.image) {
      await ctx.telegram.sendPhoto(
        ctx.session.create_service_ctx.chatId,
        ctx.session.create_service_ctx.image[0].file_id,
        {
          // parse_mode: 'Markdown',
          caption: ctx.session.create_service_ctx.description,
          reply_markup: serviceId
            ? {
                inline_keyboard: [
                  [
                    {
                      text: `Показать отзывы 🗣️ (${review.data.length})`,
                      callback_data: `/show-more-info/reviews/${serviceId}/${chatId}`,
                    },
                  ],
                  [
                    {
                      text: 'Посмотреть полное описани на сайте 🔗',
                      url: `${
                        this.configService.get('API').split('api')[0]
                      }/catalog/profi/${categorySlug}/${serviceId}`,
                    },
                  ],
                  [
                    {
                      text: 'Показать контакты 💭',
                      callback_data: `/show-more-info/contacts/${serviceId}/${chatId}`,
                    },
                  ],
                ],
              }
            : {
                inline_keyboard: [
                  [
                    {
                      text: 'Просмотр отзывов не доступен. ⛔️',
                      callback_data: `notification`,
                    },
                  ],
                  [
                    {
                      text: 'Показать контакты 💭',
                      callback_data: `/show-contacts/${chatId}/${ctx.session.from.username}`,
                    },
                  ],
                ],
              },
        },
      );
    } else {
      await ctx.telegram.sendMessage(
        ctx.session.create_service_ctx.chatId,
        ctx.session.create_service_ctx.description,
        {
          parse_mode: 'Markdown',
          reply_markup: serviceId
            ? {
                inline_keyboard: [
                  [
                    {
                      text: `Показать отзывы 🗣️ (${review.data.length})`,
                      callback_data: `/show-more-info/reviews/${serviceId}/${chatId}`,
                    },
                  ],
                  [
                    {
                      text: 'Показать контакты 💭',
                      callback_data: `/show-more-info/contacts/${serviceId}/${chatId}`,
                    },
                  ],
                  [
                    {
                      text: 'Посмотреть полное описани на сайте 🔗',
                      url: `${
                        this.configService.get('API').split('api')[0]
                      }/catalog/profi/${categorySlug}/${serviceId}`,
                    },
                  ],
                ],
              }
            : {
                inline_keyboard: [
                  [
                    {
                      text: 'Просмотр отзывов не доступен. ⛔️',
                      callback_data: `notification`,
                    },
                  ],
                  [
                    {
                      text: 'Показать контакты 💭',
                      callback_data: `/show-contacts/${chatId}/${ctx.session.from.username}`,
                    },
                  ],
                ],
              },
        },
      );
    }
    await ctx.reply(
      'Ваша услуга успешно опубликована! Если хотите разместить еще одну, нажмите "вернуться в главное меню',
      getInlineButtons([
        {
          data: Commands.menu,
          text: '↩️ Вернуться в главное меню.',
        },
      ]),
    );
  }

  async getNotification(@Ctx() ctx: TelegrafContext) {
    await ctx.answerCbQuery(
      'Пользователь не зарегестрирован на sellershub.ru\nПросмотр отзывов не доступен.',
      {
        show_alert: true,
      },
    );
  }

  async sendContacts(@Ctx() ctx: TelegrafContext) {
    const user = await this.userService.findOne({
      //@ts-ignore
      telegram_id: ctx.update.callback_query.from.id,
    });
    const matchArr = ctx.match.input.split('/');
    const username = matchArr[matchArr.length - 1];

    if (user) {
      await ctx.answerCbQuery('Контакты отправлены в чат бот Sellershub.', {
        show_alert: true,
      });
      await ctx.telegram.sendMessage(
        ctx.update.callback_query.from.id,
        `telegram: ${'https://t.me/' + username}`,
      );
    } else {
      if (
        ctx.update.callback_query.message.chat.id ==
        this.configService.get('INFOGRAPHIC_CHAT_ID')
      ) {
        await ctx.answerCbQuery('', {
          url: `${this.configService.get('BOT_URL')}?start=${Utm.chat_design}`,
        });
        await ctx.telegram.sendMessage(
          ctx.update.callback_query.from.id,
          `telegram: ${'https://t.me/' + username}`,
        );
      }
      if (
        ctx.update.callback_query.message.chat.id ==
        this.configService.get('MANAGER_CHAT_ID')
      ) {
        await ctx.answerCbQuery('', {
          url: `${this.configService.get('BOT_URL')}?start=${
            Utm.chat_managers
          }`,
        });
        await ctx.telegram.sendMessage(
          ctx.update.callback_query.from.id,
          `telegram: ${'https://t.me/' + username}`,
        );
      }
    }
  }

  async sendMoreInfo(@Ctx() ctx: TelegrafContext) {
    const matchArr = ctx.match.input.split('/');
    const infoType = matchArr[matchArr.length - 3];
    const serviceId = matchArr[matchArr.length - 2];
    const service = await this.sellersHubBotApi.getService(+serviceId, ctx);

    if (infoType === 'reviews') {
      const user = await this.userService.findOne({
        //@ts-ignore
        telegram_id: ctx.update.callback_query.from.id,
      });
      if (!user) {
        if (
          ctx.update.callback_query.message.chat.id ==
          this.configService.get('INFOGRAPHIC_CHAT_ID')
        ) {
          await ctx.answerCbQuery('', {
            url: `${this.configService.get('BOT_URL')}?start=${
              Utm.chat_design
            }`,
          });
        }
        if (
          ctx.update.callback_query.message.chat.id ==
          this.configService.get('MANAGER_CHAT_ID')
        ) {
          await ctx.answerCbQuery('', {
            url: `${this.configService.get('BOT_URL')}?start=${
              Utm.chat_managers
            }`,
          });
        }
      }

      await ctx.answerCbQuery(
        'Отзывы отправлены в чат бот Sellershub.\nДля просмотра отзывов перейдите в чат и нажмите кнопку "Посмотреть отзывы"',
        {
          show_alert: true,
        },
      );
      const reviews = service.data.attributes.review.data;
      if (reviews.length) {
        const categorySlug =
          service.data.attributes.service_categories.data[0].attributes.slug;
        const serviceUrl = `${
          this.configService.get('API').split('api')[0]
        }catalog/profi/${categorySlug}/${serviceId}?telegram-reviews=true`;

        await ctx.telegram.sendMessage(
          //@ts-ignore
          ctx.update.callback_query.from.id,
          'Для просмотра отзывов нажмите кнопку ниже 👇',
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Посмотреть отзывы',
                    web_app: {
                      url: serviceUrl,
                    },
                  },
                ],
              ],
            },
          },
        );
      } else {
        await ctx.telegram.sendMessage(
          //@ts-ignore
          ctx.update.callback_query.from.id,
          'Отзывы отсутствуют. 😞',
        );
      }
    }
    if (infoType === 'contacts') {
      const {
        contact_telegram,
        contact_email,
        contact_instagram,
        contact_viber,
        contact_vk,
        contact_whatsup,
        phone_number,
      } = service.data.attributes.profile.data.attributes;

      const contactsMessage = `telegram: ${
        contact_telegram ? contact_telegram : 'Отсутствует'
      }\nemail: ${contact_email ? contact_email : 'Отсутствует'}\ninstagram:${
        contact_instagram ? contact_instagram : 'Отсутствует'
      }\nviber: ${contact_viber ? contact_viber : 'Отсутствует'}\nvk:${
        contact_vk ? contact_vk : 'Отсутствует'
      }\nwhatsapp: ${
        contact_whatsup ? contact_whatsup : 'Отсутствует'
      }\nТелефон: ${phone_number ? phone_number : 'Отсутствует'}\n`;

      await ctx.answerCbQuery('Контакты отправлены в чат бот Sellershub.', {
        show_alert: true,
      });
      await ctx.telegram.sendMessage(
        //@ts-ignore
        ctx.update.callback_query.from.id,
        contactsMessage,
      );
    }
  }

  async createServiceViaSite(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands['create-via-site'],
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username,
    });
    const matchArr = ctx.match.input.split('/');
    const id = matchArr[matchArr.length - 1];
    const service = await this.sellersHubBotApi.getService(+id, ctx);

    ctx.session.create_service_ctx.serviceId = service.data.id;

    ctx.session.create_service_ctx.description =
      htmlParser.NodeHtmlMarkdown.translate(
        service.data.attributes.description.substring(0, 1000) + '...',
      );

    if (
      service.data.attributes.previews.data &&
      service.data.attributes.previews.data.length
    ) {
      const image = `${this.configService.get('API')}${
        service.data.attributes.previews.data[0].attributes.url
      }`;
      ctx.session.create_service_ctx.image = [
        {
          file_id: image,
        },
      ];
      await ctx.replyWithPhoto(
        ctx.session.create_service_ctx.image[0].file_id,
        {
          caption: ctx.session.create_service_ctx.description,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Опубликовать',
                  callback_data: 'send-to-chat',
                },
              ],
              [
                {
                  text: '↩️ Вернуться в меню',
                  callback_data: Commands.menu,
                },
              ],
            ],
          },
        },
      );
    } else {
      await ctx.reply(ctx.session.create_service_ctx.description, {
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Опубликовать',
                callback_data: 'send-to-chat',
              },
            ],
            [
              {
                text: '↩️ Вернуться в меню',
                callback_data: Commands.menu,
              },
            ],
          ],
        },
      });
    }
  }
}
