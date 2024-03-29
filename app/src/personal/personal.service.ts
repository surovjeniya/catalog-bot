import { Injectable } from '@nestjs/common';
import { Actions } from 'src/enum/actions.enum';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class PersonalService {
  constructor(private readonly loggerService: LoggerService) {}

  async getPersonal(ctx: TelegrafContext) {
    await this.loggerService.updateLog({
      action: Commands.personal,
      day: new Date().toDateString(),
      telegram_id: ctx.from.id,
      username: ctx.from.username ? ctx.from.username : null,
    });
    ctx.session.action = Actions['personal-specialist'];
    await ctx.replyWithHTML(
      `Для создания индивидуального заказа необходимо отправить техническое задание в нашу <a href="https://t.me/Nastyasellers">поддержку</a>. Если у вас нет технического задания, <a href="https://t.me/Nastyasellers">мы</a> поможем его составить.`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '↩️ Вернуться в меню', callback_data: Commands.menu }],
          ],
        },
      },
    );
  }
}
