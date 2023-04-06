import { ConfigService } from '@nestjs/config';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { Utm } from 'src/user/user.entity';
import { getSellerCase, getSpammerCase } from '../chat-cases';

export const chatListener = async (
  ctx: TelegrafContext,
  configService: ConfigService,
) => {
  if (ctx.update.message.chat.id == configService.get('INFOGRAPHIC_CHAT_ID')) {
    return await infographicChatListener(ctx, configService);
  }
  if (ctx.update.message.chat.id == configService.get('MANAGER_CHAT_ID')) {
    return await managerChatListener(ctx, configService);
  }
};

const managerChatListener = async (
  ctx: TelegrafContext,
  configService: ConfigService,
) => {
  const { text } = ctx.update.message;

  if (getSpammerCase(text)) {
    const messages = [
      `Регистрируйтесь в <a href="${configService.get('BOT_URL')}?start=${
        Utm.chat_managers
      }">нашем боте</a>, чтобы размещать свои услуги или искать исполнителей.\nРегистрация в боте дает дополнительные бонусы как для специалистов, так и для селлеров:\n- доступ к отзывам и рейтингу\n-  подарки гайдов и чек-листов по работе на маркетплейсах.\nПо вопросам работы бота пишите в поддержку с пометкой “чат-бот”. (https://t.me/Nastyasellers)`,
      `Используйте <a href="${configService.get('BOT_URL')}?start=${
        Utm.chat_managers
      }">наш бот</a> для поиска сотрудников или размещения своих услуг.\nРегистрация в боте дает доступ к гайдам и чек-листам по работе на маркетплейсах.\nПо вопросам работы бота пишите в поддержку с пометкой “чат-бот”. (https://t.me/Nastyasellers)`,
    ];
    await ctx.replyWithHTML(messages[Math.random().toFixed()], {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  if (getSellerCase(text)) {
    await ctx.replyWithHTML(
      `Спасибо, что ищите специалистов в нашем чате!\nПройдите быструю регистрацию в <a href="${configService.get(
        'BOT_URL',
      )}?start=${
        Utm.chat_managers
      }">нашем боте</a>, чтобы получать дополнительные бонусы и чек листы по  работе на маркетплейсе.\nПо вопросам работы бота пишите в поддержку с пометкой “чат-бот”. (https://t.me/Nastyasellers)`,
      {
        reply_to_message_id: ctx.message.message_id,
      },
    );
  }

  if (!getSellerCase(text) && !getSpammerCase(text)) {
    await ctx.replyWithHTML(
      `Вы знали, что ваши сообщения удаляются спустя 5 минут?\nЗарегистрируйтесь в <a href="${configService.get(
        'BOT_URL',
      )}?start=${
        Utm.chat_managers
      }">нашем боте</a>, чтобы ваш пост висел вечность.\nХотите больше конверсии? Размещайте свою услугу в каталоге <a href="${configService.get(
        'WEB',
      )}">SellersHub</a> , где десятки тысячи селлеров ищут специалистов для сотрудничества.\nПо вопросам работы бота вы можете обратиться в нашу <a href="https://t.me/Nastyasellers">поддержку</a>.`,
      {
        reply_to_message_id: ctx.message.message_id,
      },
    );
  }
};

const infographicChatListener = async (
  ctx: TelegrafContext,
  configService: ConfigService,
) => {
  const { text } = ctx.update.message;

  if (getSpammerCase(text)) {
    const messages = [
      `Регистрируйтесь в <a href="${configService.get('BOT_URL')}?start=${
        Utm.chat_design
      }">нашем боте</a>, чтобы размещать свои услуги или искать исполнителей.\nРегистрация в боте дает дополнительные бонусы как для специалистов, так и для селлеров:\n- доступ к отзывам и рейтингу\n-  подарки гайдов и чек-листов по работе на маркетплейсах.\nПо вопросам работы бота пишите в поддержку с пометкой “чат-бот”. (https://t.me/Nastyasellers)`,
      `Используйте <a href="${configService.get('BOT_URL')}?start=${
        Utm.chat_design
      }">наш бот</a> для поиска сотрудников или размещения своих услуг.\nРегистрация в боте дает доступ к гайдам и чек-листам по работе на маркетплейсах.\nПо вопросам работы бота пишите в поддержку с пометкой “чат-бот”. (https://t.me/Nastyasellers)`,
    ];
    await ctx.replyWithHTML(messages[Math.random().toFixed()], {
      reply_to_message_id: ctx.message.message_id,
    });
  }

  if (getSellerCase(text)) {
    await ctx.replyWithHTML(
      `Спасибо, что ищите специалистов в нашем чате!\nПройдите быструю регистрацию в <a href="${configService.get(
        'BOT_URL',
      )}?start=${
        Utm.chat_design
      }">нашем боте</a>, чтобы получать дополнительные бонусы и чек листы по  работе на маркетплейсе.\nПо вопросам работы бота пишите в поддержку с пометкой “чат-бот”. (https://t.me/Nastyasellers)`,
      {
        reply_to_message_id: ctx.message.message_id,
      },
    );
  }

  if (!getSellerCase(text) && !getSpammerCase(text)) {
    await ctx.replyWithHTML(
      `Вы знали, что ваши сообщения удаляются спустя 5 минут?\nЗарегистрируйтесь в <a href="${configService.get(
        'BOT_URL',
      )}?start=${
        Utm.chat_design
      }">нашем боте</a>, чтобы ваш пост висел вечность.\nХотите больше конверсии? Размещайте свою услугу в каталоге <a href="${configService.get(
        'WEB',
      )}">SellersHub</a> , где десятки тысячи селлеров ищут специалистов для сотрудничества.\nПо вопросам работы бота вы можете обратиться в нашу <a href="https://t.me/Nastyasellers">поддержку</a>.`,
      {
        reply_to_message_id: ctx.message.message_id,
      },
    );
  }
};
