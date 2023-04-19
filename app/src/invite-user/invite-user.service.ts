import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { UserService } from 'src/user/user.service';
import { Telegraf } from 'telegraf';
import { BidFulFillmentDto } from './dto/bid-fulfillment.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { SearchFulfillmentDto } from './dto/search-fulfillment.dto';

@Injectable()
export class InviteUserService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<TelegrafContext>,
    private readonly userService: UserService,
  ) {}

  async bidFulfillment({ contacts, service, service_id }: BidFulFillmentDto) {
    // const username = service.profile.contact_telegram
    //   ? service.profile.contact_telegram.split('/')[1]
    //   : null;
    // let userId: number = null;
    // if (username) {
    //   const user = await this.userService.findOne({ username });
    //   if (user && user.telegram_id) {
    //     userId = user.telegram_id;
    //   }
    // }

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
    // if (userId) {
    //   await this.bot.telegram.sendMessage(userId, message);
    // }
    return await this.bot.telegram.sendMessage(54452505, message);
  }

  async searchFulfillment(dto: SearchFulfillmentDto) {
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
  }

  async inviteUser({ name, phone, telegram_username, url }: InviteUserDto) {
    return await this.bot.telegram.sendMessage(
      54452505,
      `Фуллфилмент:персональный подбор\n
      \nИмя: ${name},\n
       Номер телефона:${phone},\n
       Telegram: ${telegram_username ? telegram_username : 'отсутствует'}\n,
       url: ${url ? url : 'отсутствует'}`,
    );
  }
}
