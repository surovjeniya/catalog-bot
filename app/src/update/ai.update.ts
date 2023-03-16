import { Action, Ctx, Update } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';

@Update()
export class AiUpdate {
  @Action(Commands.ai)
  async getAi(@Ctx() ctx: TelegrafContext) {
    await ctx.replyWithPhoto(
      'https://sellershub.ru/api/uploads/photo_2023_03_15_12_38_52_00dc0f6b34.jpg?updated_at=2023-03-16T12:53:44.231Z',
      {
        parse_mode: 'HTML',
        caption: {
          text: `Рады приветствовать вас сервисе AI-копирайтинга от <a href="https://sellershub.ru/?utm_medium=smm&utm_source=tg&utm_campaign=bot_ai&utm_term=bot_button&utm_content=1">Sellershub.ru</a>\nСервис использует искусственный интеллект для написания SEO-текста для описания товара используя ваши ключи для товара.\nМы обучаем нашу модель на базе товаров Wildberries.`,
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Хочу попробовать!',
                url: 'https://t.me/ai_copywriting_bot',
              },
              {
                text: 'Вернуться в меню.',
                callback_data: Commands.start,
              },
            ],
          ],
        },
      },
    );
  }
}
