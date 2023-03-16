import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';

@Update()
export class ChatsUpdate {
  constructor() {}

  @Action(Commands.chats)
  async getChats(@Ctx() ctx: TelegrafContext) {
    await ctx.replyWithPhoto(
      'https://sellershub.ru/api/uploads/photo_2023_03_16_15_36_19_a526720194.jpg?updated_at=2023-03-16T12:36:32.471Z',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '💬 Инфографика для маркетплейсов от Селлерсхаб',
                url: 'https://t.me/sellershub_design',
              },
            ],
            [
              {
                text: '💬 Менеджеры ЛК от Селлерсхаб',
                url: 'https://t.me/sellershub_managers',
              },
            ],
            [
              {
                text: '💬 Хаб селлеров WB и Ozon',
                url: 'https://t.me/SellersHUBofficial',
              },
            ],
            [
              {
                text: '💬 Оффициальный канал SellersHub',
                url: 'https://t.me/sellershubwow',
              },
            ],
            [
              {
                text: '💬 Чат AI-копирайтинг от Селлерсхаб',
                url: 'https://t.me/Sellershub_bot_ai',
              },
            ],
            [
              {
                text: '↩️ Вернуться в меню',
                callback_data: 'start',
              },
              {
                text: '🤝 Поддержка',
                callback_data: Commands.support,
              },
            ],
          ],
        },
      },
    );
  }
}
