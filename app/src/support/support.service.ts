import { Injectable } from '@nestjs/common';
import { Ctx } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class SupportService {
  constructor(private readonly loggerService: LoggerService) {}

  async getSupport(@Ctx() ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands.support,
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username ? ctx.from.username : null,
    });
    await ctx.replyWithPhoto(
      'https://sellershub.ru/api/uploads/chat_f27c971104.jpg?updated_at=2023-03-16T12:34:08.511Z',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '💬 Вопросы приобретения платных опций',
                url: 'https://t.me/sellershub_m',
              },
            ],
            [
              {
                text: '💬 Консультация по сотрудничеству и партнёрским программам',
                url: 'https://t.me/jlmr11',
              },
            ],
            [
              {
                text: '💬 Вопросы, касающиеся онлайн-каталога',
                url: 'https://t.me/sellershub_m',
              },
            ],
            [
              {
                text: '💬 Технические проблемы и неполадки',
                url: 'https://t.me/Sellershub_support',
              },
            ],
            [
              {
                text: '↩️ Вернуться в меню',
                callback_data: Commands.menu,
              },
              {
                text: '💬 Наши каналы и чаты',
                callback_data: Commands.chats,
              },
            ],
          ],
        },
      },
    );
  }
}
