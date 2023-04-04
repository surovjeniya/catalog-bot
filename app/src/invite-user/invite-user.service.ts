import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { Telegraf } from 'telegraf';
import { BidFulFillmentDto } from './dto/bid-fulfillment.dto';
import { InviteUserDto } from './dto/invite-user.dto';
import { SearchFulfillmentDto } from './dto/search-fulfillment.dto';

@Injectable()
export class InviteUserService {
  constructor(@InjectBot() private readonly bot: Telegraf<TelegrafContext>) {}

  async bidFulfillment(dto: BidFulFillmentDto) {
    return {
      ...dto,
    };
  }

  async searchFulfillment(dto: SearchFulfillmentDto) {
    const message = `
    Фуллфилмент:заявка на расчёт\n
    Местоположение: ${
      dto.locations.length ? JSON.stringify(dto.locations) : 'отсутствует'
    } \n
    Услуги: ${
      dto.services.length ? JSON.stringify(dto.services) : 'отсутствует'
    } \n
    Упаковка: ${
      dto.packaging.length ? JSON.stringify(dto.packaging) : 'отсутствует'
    } \n
    Ценовой сегмент: ${
      dto.price_segment.length
        ? JSON.stringify(dto.price_segment)
        : 'отсутствует'
    } \n
    Дополнительная информация: ${
      dto.description.length ? JSON.stringify(dto.description) : 'отсутствует'
    } \n
    Контакты: ${dto.contacts ? JSON.stringify(dto.contacts) : 'отсутствует'}
    `;
    return await this.bot.telegram.sendMessage(54452505, message);
  }

  async inviteUser({ name, phone, telegram_username, url }: InviteUserDto) {
    console.log(name, phone, telegram_username, url);
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
