import { Injectable, Logger } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Telegraf } from 'telegraf';
import { BidFulFillmentDto } from './dto/bid-fulfillment.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { SearchFulfillmentDto } from './dto/search-fulfillment.dto';

@Injectable()
export class InviteUserService {
  private readonly logger = new Logger(InviteUserService.name);

  constructor(
    @InjectBot() private readonly bot: Telegraf<TelegrafContext>,
    private readonly userService: UserService,
  ) {}

  async bidFulfillment({ contacts, service, service_id }: BidFulFillmentDto) {
    try {
      const username =
        service.profile && service.profile.contact_telegram
          ? service.profile.contact_telegram.split('/')[1]
          : null;
      let user: UserEntity = null;
      if (username) {
        user = await this.userService.findOne({ username });
      }

      const message = `
    Фуллфилмент: связаться\n
    Название: ${service.name}\n
    Телефон: ${contacts.phone ? contacts.phone : 'отсутствует'}\n
    Telegram: ${
      contacts.telegram_username ? contacts.telegram_username : 'отсутствует'
    }\n
    Whatsapp: ${contacts.whatsapp ? contacts.whatsapp : 'отсутствует'}\n
    Email: ${contacts.email ? contacts.email : 'отсутствует'}\n
    Id услуги: ${service.id}
    `;
      // if (user) {
      //   await this.bot.telegram.sendMessage(user.telegram_id, message);
      // }
      return await this.bot.telegram.sendMessage(54452505, message);
    } catch (e) {
      this.logger.error('Error from bidFulfillment', e.message);
    }
  }

  async searchFulfillment(dto: SearchFulfillmentDto) {
    try {
      const message = `
      Фуллфилмент:заявка на расчёт\n
      Местоположение: ${
        dto.locations && dto.locations.length
          ? JSON.stringify(dto.locations)
          : 'отсутствует'
      } \n
      Услуги: ${
        dto.services && dto.services.length
          ? JSON.stringify(dto.services)
          : 'отсутствует'
      } \n
      Упаковка: ${
        dto.packaging && dto.packaging.length
          ? JSON.stringify(dto.packaging)
          : 'отсутствует'
      } \n
      Ценовой сегмент: ${
        dto.price_segment && dto.price_segment.length
          ? JSON.stringify(dto.price_segment)
          : 'отсутствует'
      } \n
      Дополнительная информация: ${
        dto.description && dto.description.length
          ? JSON.stringify(dto.description)
          : 'отсутствует'
      } \n
      Контакты: ${dto.contacts ? JSON.stringify(dto.contacts) : 'отсутствует'}
      `;
      return await this.bot.telegram.sendMessage(54452505, message);
    } catch (e) {
      this.logger.error('Error from searchFulfillment', e.message);
    }
  }

  async inviteUser({ name, phone, telegram_username, url }: InviteUserDto) {
    try {
      return await this.bot.telegram.sendMessage(
        54452505,
        `Фуллфилмент:персональный подбор\n
        \nИмя: ${name},\n
         Номер телефона:${phone},\n
         Telegram: ${telegram_username ? telegram_username : 'отсутствует'}\n,
         url: ${url ? url : 'отсутствует'}`,
      );
    } catch (e) {
      this.logger.error('Error from inviteUser', e.message);
    }
  }
}
