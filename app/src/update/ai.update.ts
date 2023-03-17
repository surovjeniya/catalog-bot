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
          text: `AI-копирайтер использует искусственный интеллект и создаёт SEO-тексты для описания товара, использую ваши ключевые слова.Мы обучаем модель на базе товаров Wildberries.`,
        },
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Получить уникальное описание',
                url: 'https://t.me/ai_copywriting_bot',
              },
              {
                text: 'Вернуться в меню.',
                callback_data: Commands.menu,
              },
            ],
          ],
        },
      },
    );
  }
}
