import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectBot } from 'nestjs-telegraf';
import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { LoggerService } from 'src/logger/logger.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { asyncEachIterator } from 'src/utils/async-each-iterator.utils';
import { Telegraf, TelegramError } from 'telegraf';
import { SendMessageToUsersDto } from './dto/send-message-to-users.dto';

@Injectable()
export class MailingService {
  private readonly logger = new Logger(MailingService.name);
  constructor(
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
    @InjectBot() private readonly bot: Telegraf<TelegrafContext>,
  ) {}

  async sendMessageToUsers(dto: SendMessageToUsersDto) {
    try {
      const users = await this.userService.find();
      asyncEachIterator(users, (user: UserEntity, i) => {
        if (!dto.image_path) {
          this.bot.telegram
            .sendMessage(user.telegram_id, dto.message, {
              parse_mode: 'HTML',
            })
            .then(() =>
              console.log({
                index: i,
                id: user.telegram_id,
                username: user.username ? user.username : null,
                status: 'Success',
              }),
            )
            .catch((error: TelegramError) =>
              console.log({
                index: i,
                id: user.telegram_id,
                username: user.username ? user.username : null,
                status: 'Error',
                message: error.message,
              }),
            );
        }
        if (dto.image_path) {
          this.bot.telegram
            .sendPhoto(user.telegram_id, dto.image_path, {
              caption: dto.message,
              parse_mode: 'HTML',
            })
            .catch((error: TelegramError) => {
              console.log({
                index: i,
                id: user.telegram_id,
                username: user.username ? user.username : null,
                status: 'Error',
                message: error.message,
              });
            })
            .then(() =>
              console.log({
                index: i,
                id: user.telegram_id,
                username: user.username ? user.username : null,
                status: 'Success',
              }),
            );
        }
      });
    } catch (e) {
      this.logger.error(`Error from ${this.sendMessageToUsers}`, e.message);
    }
  }

  // async sendMessageToUsers(messages: string[]) {
  //   const photo =
  //     'https://selleershub.ru/api/uploads/7_f0fc54a06c.png?updated_at=2023-04-13T10:02:11.243Z';
  //   const users = await this.userService.find();
  //   const ids = users.map((item) => item.telegram_id);
  //   for (let i = 0; i < ids.length; i++) {
  //     this.bot.telegram.sendPhoto(ids[i], photo, {
  //       parse_mode: 'HTML',
  //       caption:
  //         messages[
  //           Math.abs(Number((Math.random() * messages.length - 1).toFixed()))
  //         ],
  //     });
  //   }
  // }

  async sendMessageToSendToChatUsers(messages: string[]) {
    const photo =
      'https://selleershub.ru/api/uploads/7_f0fc54a06c.png?updated_at=2023-04-13T10:02:11.243Z';
    const logs = await this.loggerService.find();
    const matchedUsers = [];
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].action === Commands['send-to-chat']) {
        matchedUsers.push(logs[i].telegram_id);
      }
    }
    const uniqueUsersSet = new Set(matchedUsers);
    const uniqueUsers = Array.from(uniqueUsersSet);

    for (let i = 0; i < uniqueUsers.length; i++) {
      this.bot.telegram.sendPhoto(uniqueUsers[i], photo, {
        parse_mode: 'HTML',
        caption:
          messages[
            Math.abs(Number((Math.random() * messages.length - 1).toFixed()))
          ],
      });
    }
  }

  // @Cron(CronExpression.EVERY_WEEK)
  // async sendNotificationToSendToChatUsersEveryWeek() {
  //   const messages = [
  //     `Для вас подарок!🎁\nСкачивайте <a href="https://sellershub.ru/api/uploads/5_mobilnyh_prilozhenij_dlya_prodavczov_na_marketplejse_upravlyajte_svoimi_prodazhami_na_hodu_0cc498da54.pdf?updated_at=2023-04-13T07:11:41.230Z">список из 5 мобильных приложений для работы на маркетплейсе</a>-управляйте продажами на ходу!\nПродолжайте пользоваться нашим ботом, регистрируйтесь на сайте и получайте больше бонусов.⚡️`,
  //     `Для вас подарок!🎁\nСкачивайте <a href="https://sellershub.ru/api/uploads/5_mobilnyh_prilozhenij_dlya_prodavczov_na_marketplejse_upravlyajte_svoimi_prodazhami_na_hodu_0cc498da54.pdf?updated_at=2023-04-13T07:11:41.230Z">список из 5 мобильных приложений для работы на маркетплейсе</a>-управляйте продажами на ходу!\nПродолжайте пользоваться нашим ботом, регистрируйтесь на сайте и получайте больше бонусов.⚡️`,
  //   ];
  //   return await this.sendMessageToSendToChatUsers(messages);
  // }

  // @Cron(CronExpression.EVERY_HOUR)
  // async sendNotificationToSendToChatUsersEveryHour() {
  //   const messages = [
  //     `Благодарим за использование бота!⚡️\nМы дарим вам <a href="https://sellershub.ru/api/uploads/Instrukcziya_po_SEO_optimizaczii_kartochek_tovara_lajfhaki_c76f241f45.pdf?updated_at=2023-04-13T07:11:39.818Z">инструкцию по SEO-оптимизации карточек товара</a>\nПродолжайте публиковать свои услуги и регистрируетесь на сайте, чтобы получать еще больше подарков 🎁. `,
  //     `Благодарим за использование бота!⚡️\nМы дарим вам <a href="https://sellershub.ru/api/uploads/Instrukcziya_po_SEO_optimizaczii_kartochek_tovara_lajfhaki_c76f241f45.pdf?updated_at=2023-04-13T07:11:39.818Z">инструкцию по SEO-оптимизации карточек товара</a>\nПродолжайте публиковать свои услуги и регистрируетесь на сайте, чтобы получать еще больше подарков 🎁. `,
  //   ];
  //   return await this.sendMessageToSendToChatUsers(messages);
  // }

  // @Cron(CronExpression.EVERY_DAY_AT_10PM)
  // async sendNotificationEveryDay() {
  //   const messages = [
  //     `Для вас подарок 🎁\nСкачивайте <a href="https://sellershub.ru/api/uploads/5_servisov_dlya_analiza_konkurentov_9ca7abb16c.pdf?updated_at=2023-04-13T07:11:41.261Z)">5 сервисов для анализа конкурентов</a>\nПубликуйте свои услуги, ищите специалистов и продолжайте получать  приятные бонусы. ⚡️`,
  //     `Для вас подарок 🎁\nСкачивайте <a href="https://sellershub.ru/api/uploads/5_servisov_dlya_analiza_konkurentov_9ca7abb16c.pdf?updated_at=2023-04-13T07:11:41.261Z)">5 сервисов для анализа конкурентов</a>\nПубликуйте свои услуги, ищите специалистов и продолжайте получать  приятные бонусы. ⚡️`,
  //   ];
  //   return await this.sendMessageToUsers(messages);
  // }

  // @Cron(CronExpression.EVERY_2_HOURS)
  // async sendNotificationEveryTwoHour() {
  //   const messages = [
  //     `Получите бесплатный доступ к продуктам для работы на маркетплейсе🚀\nСегодня мы дарим вам <a href=""https://sellershub.ru/api/uploads/Lajfhaki_i_priemy_dlya_prodvizheniya_tovara_na_marketplejse_8432ca5fc8.pdf?updated_at=2023-04-13T07:11:41.372Z>лайфхаки и приемы для продвижения товара на маркетплейсе</a>\nПубликуйте свои услуги через бот/ ищите специалистов и получайте эксклюзивные подарки 🎁.`,
  //     `Получите бесплатный доступ к продуктам для работы на маркетплейсе🚀\nСегодня мы дарим вам <a href=""https://sellershub.ru/api/uploads/Lajfhaki_i_priemy_dlya_prodvizheniya_tovara_na_marketplejse_8432ca5fc8.pdf?updated_at=2023-04-13T07:11:41.372Z>лайфхаки и приемы для продвижения товара на маркетплейсе</a>\nПубликуйте свои услуги через бот/ ищите специалистов и получайте эксклюзивные подарки 🎁.`,
  //   ];
  //   return await this.sendMessageToUsers(messages);
  // }

  // @Cron(CronExpression.EVERY_HOUR)
  // async sendNotificationEveryHour() {
  //   const messages = [
  //     `Эксклюзивно для пользователей бота🤫\nМы дарим гайды, чек-листы, полезные списки и другие продукты для работы на маркетплейсах.\nСкачивайте <a href="https://sellershub.ru/api/uploads/Nabor_instrumentov_dlya_prodazh_na_marketplejse_ef5d3bcff2.pdf?updated_at=2023-04-13T07:11:41.385Z">набор инструментов для продаж на маркетплейсах</a>.\nПродолжайте использовать бот, чтобы получить больше полезного материала.`,
  //     `Эксклюзивно для пользователей бота🤫\nМы дарим гайды, чек-листы, полезные списки и другие продукты для работы на маркетплейсах.\n<a href="https://sellershub.ru/api/uploads/Plan_dejstvij_dlya_rosta_pribyli_6166d01a3b.pdf?updated_at=2023-04-13T07:11:41.369Z">Скачивайте план действий для роста прибыли</a>\nПродолжайте использовать бот, чтобы получить больше полезного материала.`,
  //   ];
  //   return await this.sendMessageToUsers(messages);
  // }
}
