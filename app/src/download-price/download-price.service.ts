import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { SellersHubBotApi } from 'src/utils/api-class.utils';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { UserService } from 'src/user/user.service';
import { Utm } from 'src/user/user.entity';

@Injectable()
export class DownloadPriceService {
  constructor(
    private readonly api: SellersHubBotApi,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async getPrice(ctx: TelegrafContext) {
    const service = await this.api.getService(
      ctx.session.download_price.serviceId,
      ctx,
    );

    let fileName: string = null;
    let fileUrl: string = null;
    const { slug: categorySlug } =
      service.data.attributes.service_categories.data[0].attributes;
    const { slug: parentCategorySlug } =
      service.data.attributes.service_categories.data[0].attributes
        .parent_category.data.attributes;
    const serviceUrl = `${this.configService.get(
      'WEB',
    )}/catalog/${parentCategorySlug}/${categorySlug}/${service.data.id}`;
    console.log(serviceUrl);
    if (
      service.data.attributes.price_file &&
      service.data.attributes.price_file.data.length
    ) {
      fileUrl = `${this.configService.get('API')}${
        service.data.attributes.price_file.data[0].attributes.url
      }`;

      fileName = fileUrl.split('/')[fileUrl.split('/').length - 1];
    } else {
      throw new Error('File not found');
    }

    const response = await axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream',
    });

    if (response.data) {
      new Promise((res, rej) => {
        const stream = fs.createWriteStream(path.join(__dirname, fileName));
        response.data.pipe(stream);
        stream.on('finish', () => {
          ctx.reply(
            `Добрый день,${
              ctx.from.first_name
                ? ctx.from.first_name +
                  '.Вы можете скачать прайс по ссылке ниже.'
                : '.Вы можете скачать прайс по ссылке ниже.'
            }`,
          );
          ctx.reply(serviceUrl);
          ctx.replyWithDocument(
            { source: path.join(__dirname, fileName) },
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Вернуться в меню',
                      callback_data: 'menu',
                    },
                  ],
                ],
              },
            },
          );
        });
        stream.on('error', (e) => rej(e));
      });
      const user = await this.userService.findOne({
        telegram_id: String(ctx.from.id),
      });

      if (!user) {
        await this.userService.create({
          first_name: ctx.from.first_name ? ctx.from.first_name : null,
          language_code: ctx.from.language_code,
          is_bot: ctx.from.is_bot,
          last_name: ctx.from.last_name ? ctx.from.language_code : null,
          username: ctx.from.username ? ctx.from.username : null,
          telegram_id: String(ctx.from.id),
          utm: Utm.download_price,
        });
      }
    } else {
      ctx.reply('Что то пошло не так');
    }
  }
}
