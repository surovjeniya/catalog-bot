import { ConfigService } from '@nestjs/config';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { Utm } from 'src/user/user.entity';
import { getSellerCase, getSpammerCase } from '../chat-cases';

export const chatListener = async (
  ctx: TelegrafContext,
  configService: ConfigService,
) => {
  const { text } = ctx.update.message;

  if (
    (getSpammerCase(text) || getSellerCase(text)) &&
    (ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID') ||
      ctx.update.message.chat.id == configService.get('MANAGER_CHAT_ID'))
  ) {
    if (getSpammerCase(text)) {
      const messages = [
        `<b>Регистрируйтесь в <a href="${configService.get('BOT_URL')}?start=${
          ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID')
            ? Utm.chat_design
            : Utm.chat_managers
        }">нашем боте</a>, чтобы размещать свои услуги или искать исполнителей.</b>\n\nРегистрация в боте дает дополнительные бонусы как для специалистов, так и для селлеров:\n\n⚡️доступ к отзывам и рейтингу,\nгайды и чек-листы по работе на маркетплейсах в подарок🎁.\n\nПо вопросам работы бота пишите в  <a href="https://t.me/Nastyasellers">поддержку</a> с пометкой “чат-бот”.`,
        `<b>Используйте <a href="${configService.get('BOT_URL')}?start=${
          ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID')
            ? Utm.chat_design
            : Utm.chat_managers
        }">наш бот</a> для поиска сотрудников или размещения своих услуг.</b>\n\nРегистрация в боте дает доступ к гайдам и чек-листам по работе на маркетплейсах🎁.\n\nПо вопросам работы бота пишите в  <a href="https://t.me/Nastyasellers">поддержку</a> с пометкой “чат-бот”.`,
      ];
      await ctx.replyWithHTML(
        messages[
          Math.abs(Number((Math.random() * messages.length - 1).toFixed()))
        ],
        {
          reply_to_message_id: ctx.message.message_id,
        },
      );
    }
    if (getSellerCase(text)) {
      const messages = [
        `<b>Спасибо, что ищите специалистов в нашем чате!</b>\n\nЕще больше проверенных подрядчиков вы найдете в нашем <a href="${configService.get(
          'WEB',
        )}">каталоге</a>.🔥\n\nПройдите быструю регистрацию в <a href="${configService.get(
          'BOT_URL',
        )}?start=${
          ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID')
            ? Utm.chat_design
            : Utm.chat_managers
        }">нашем боте</a>, чтобы получать дополнительные бонусы и чек листы по  работе на маркетплейсе.\n\nПо вопросам работы бота пишите в <a href="https://t.me/Nastyasellers">поддержку</a> с пометкой “чат-бот”.`,
        `<b>Регистрируйтесь в <a href="${configService.get('BOT_URL')}?start=${
          ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID')
            ? Utm.chat_design
            : Utm.chat_managers
        }">нашем боте</a>. Следите за рейтингом и отзывами исполнителей.</b>\n\n🎁Кроме того, за регистрацию дарим онлайн-калькулятор для расчета ЮНИТ-экономики. Прогнозируйте продажи быстро и легко!\n\n.По вопросам работы бота пишите в <a href="https://t.me/Nastyasellers">поддержку</a> с пометкой “чат-бот”.`,
        `
        <b>Ищите проверенных исполнителей и получайте подарки для развития вашего бизнеса🎁</b>\n\nЗа регистрацию в <a href="${configService.get(
          'BOT_URL',
        )}?start=${
          ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID')
            ? Utm.chat_design
            : Utm.chat_managers
        }">нашем боте</a> дарим список из 10 мощных инструментов для анализа и оптимизации продаж на маркетплейсе!🔥\n\nПо вопросам работы бота пишите в <a href="https://t.me/Nastyasellers">поддержку</a> с пометкой “чат-бот”.`,
        `<b>Как проверить трастовость исполнителя?</b>\n\nРегистрируйтесь в <a href="${configService.get(
          'BOT_URL',
        )}?start=${
          ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID')
            ? Utm.chat_design
            : Utm.chat_managers
        }">боте</a> .Следите за рейтингом и отзывами специалистов.\n\nТакже за регистрацию мы дарим гайд с лайфхаками и приемами для продвижения на маркетплейсе!🎁⚡️\n\nЕсть вопросы по работе бота? Напишите в <a href="https://t.me/Nastyasellers">поддержку</a>  с пометкой “чат-бот”.`,
      ];

      await ctx.replyWithHTML(
        messages[
          Math.abs(Number((Math.random() * messages.length - 1).toFixed()))
        ],
        {
          reply_to_message_id: ctx.message.message_id,
        },
      );
    }
  }

  if (
    !getSpammerCase(text) &&
    !getSellerCase(text) &&
    (ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID') ||
      ctx.update.message.chat.id == configService.get('MANAGER_CHAT_ID'))
  ) {
    await ctx.replyWithHTML(
      `Вы знали, что ваши сообщения удаляются спустя 5 минут?\nЗарегистрируйтесь в <a href="${configService.get(
        'BOT_URL',
      )}?start=${
        ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID')
          ? Utm.chat_design
          : Utm.chat_managers
      }">нашем боте</a>, чтобы ваш пост висел вечность.\nХотите больше конверсии? Размещайте свою услугу в каталоге <a href="${configService.get(
        'WEB',
      )}">SellersHub</a> , где десятки тысячи селлеров ищут специалистов для сотрудничества.\nПо вопросам работы бота вы можете обратиться в нашу <a href="https://t.me/Nastyasellers">поддержку</a>.`,
      {
        reply_to_message_id: ctx.message.message_id,
      },
    );
  }
};

const managerChatListener = async (
  ctx: TelegrafContext,
  configService: ConfigService,
) => {};

const infographicChatListener = async (
  ctx: TelegrafContext,
  configService: ConfigService,
) => {};
