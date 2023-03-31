import { ConfigService } from '@nestjs/config';
import { TelegrafContext } from 'src/interface/telegraf.context';

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
  await ctx.replyWithHTML(
    `Вы знали, что ваши сообщения удаляются спустя 5 минут?\nЗарегистрируйтесь в <a href="${configService.get(
      'BOT_URL',
    )}">нашем боте</a>, чтобы ваш пост висел вечность.\nХотите больше конверсии? Размещайте свою услугу в каталоге <a href="https://sellershub.ru">SellersHub</a> , где десятки тысячи селлеров ищут специалистов для сотрудничества.`,
    {
      reply_to_message_id: ctx.message.message_id,
    },
  );
};

const infographicChatListener = async (
  ctx: TelegrafContext,

  configService: ConfigService,
) => {
  await ctx.replyWithHTML(
    `Вы знали, что ваши сообщения удаляются спустя 5 минут?\nЗарегистрируйтесь в <a href="${configService.get(
      'BOT_URL',
    )}">нашем боте</a>, чтобы ваш пост висел вечность.\nХотите больше конверсии? Размещайте свою услугу в каталоге <a href="https://sellershub.ru">SellersHub</a> , где десятки тысячи селлеров ищут специалистов для сотрудничества.`,
    {
      reply_to_message_id: ctx.message.message_id,
    },
  );
};
