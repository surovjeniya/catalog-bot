import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { InjectBot } from 'nestjs-telegraf';
import {
  INTERNAL_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} from 'src/constant/api.exception.constant';
import { Commands } from 'src/enum/commands.enum';
import { ICategories } from 'src/interface/categories.interface';
import { ICategory } from 'src/interface/category.interface';
import { IMyProfile } from 'src/interface/my-profile.interface';
import {
  RegisterTelegramDtoRequest,
  RegisterTelegramDtoResponse,
} from 'src/interface/register-with-telegram.interface';
import { IRegisterData } from 'src/interface/register.interface';
import { IService } from 'src/interface/service.interface';
import { IServices } from 'src/interface/services.interface';
import { ISignInData } from 'src/interface/sign-in.interface';
import { TelegrafContext } from 'src/interface/telegraf.context';
import { ITopServices } from 'src/interface/top-services.interface';
import { Markup, Telegraf } from 'telegraf';
import { getInlineButtons } from './get-buttons.utils';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
  messageObject: {
    status: number;
    message: string;
  };
}

@Injectable()
export class SellersHubBotApi {
  constructor(
    private readonly configService: ConfigService,
    @InjectBot() private bot: Telegraf<TelegrafContext>,
  ) {}

  readonly $axios = axios.create({
    baseURL: `${this.configService.get('API')}/v1`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async getUserByTelegramId(telegram_id: number) {
    try {
      const { data: user } = await this.$axios.get(
        `/user-phones/get-by-tg/${telegram_id}`,
      );
      return user;
    } catch (e) {}
  }

  async createReview(ctx: TelegrafContext) {
    const { message, rating, serviceId } = ctx.session.fast_review;

    try {
      const { data: review } = await this.$axios.post(`/reviews/fast-review`, {
        data: {
          description: message,
          rating,
          service: serviceId,
          username: ctx.from.username ? ctx.from.username : ctx.from.id,
        },
      });
      return review;
    } catch (e) {}
  }

  async getMyProfile(ctx: TelegrafContext): Promise<IMyProfile> {
    try {
      const { data: profile } = await this.$axios.get<IMyProfile>(
        '/profiles/me',
        {
          params: {
            populate: '*',
          },
          headers: {
            Authorization: ctx.session.jwt ? `Bearer ${ctx.session.jwt}` : '',
          },
        },
      );
      return profile;
    } catch (e) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
        if (e.response.status === 404) {
          await ctx.reply('У вас пока нет профиля Sellershub.', {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: 'Создать профиль на сайте',
                    url: this.configService.get('WEB'),
                  },
                ],
                [
                  {
                    text: '↩️ Вернуться в главное меню.',
                    callback_data: Commands.menu,
                  },
                ],
              ],
            },
          });
        }
      } else {
      }
    }
  }

  async getCategoryById(ctx: TelegrafContext, id: number): Promise<ICategory> {
    try {
      const { data: category } = await this.$axios.get<ICategory>(
        `/service-categories/${id}`,
        {
          params: {
            populate: '*',
          },
        },
      );
      return category;
    } catch (e) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
        if (e.response.status === 500) {
          await ctx.reply(INTERNAL_ERROR);
          throw new InternalServerErrorException();
        }
        if (e.response.status === 404) {
          await ctx.reply(NOT_FOUND);
          throw new NotFoundException();
        }
      } else {
        await ctx.reply(BAD_REQUEST);
        throw new BadRequestException();
      }
    }
  }

  async getTopOfMonthServices(
    ctx: TelegrafContext,
    slug: string,
  ): Promise<ITopServices> {
    try {
      const { data: services } = await this.$axios.get<ITopServices>(
        `/services/top/${slug}`,
      );
      return services;
    } catch (e) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
        if (e.response.status === 500) {
          await ctx.reply(INTERNAL_ERROR);
          throw new InternalServerErrorException();
        }
        if (e.response.status === 404) {
          await ctx.reply(NOT_FOUND);
          throw new NotFoundException();
        }
      } else {
        await ctx.reply(BAD_REQUEST);
        throw new BadRequestException();
      }
    }
  }

  async getServices(ctx: TelegrafContext) {
    try {
      const { data: services } = await this.$axios.get<IServices>('/services', {
        headers: {
          Authorization: ctx.session.jwt ? `Bearer ${ctx.session.jwt}` : '',
        },
      });
      return services;
    } catch (e) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
        if (e.response.status === 500) {
          await ctx.reply(INTERNAL_ERROR);
          throw new InternalServerErrorException();
        }
        if (e.response.status === 404) {
          await ctx.reply(NOT_FOUND);
          throw new NotFoundException();
        }
      } else {
        await ctx.reply(BAD_REQUEST);
        throw new BadRequestException();
      }
    }
  }

  async getService(id: number, ctx: TelegrafContext): Promise<IService> {
    try {
      const { data: service } = await this.$axios.get<IService>(
        `/services/${id}`,
        {
          params: {
            populate: '*',
          },
        },
      );
      return service;
    } catch (e) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
        if (e.response.status === 500) {
          await ctx.reply(INTERNAL_ERROR);
          throw new InternalServerErrorException();
        }
        if (e.response.status === 404) {
          await ctx.reply(NOT_FOUND);
          throw new NotFoundException();
        }
      } else {
        await ctx.reply(BAD_REQUEST);
        throw new BadRequestException();
      }
    }
  }

  async getCategories(ctx: TelegrafContext): Promise<ICategories> {
    try {
      const { data: categories } = await this.$axios.get<ICategories>(
        '/service-categories',
      );
      return categories;
    } catch (e) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(e)) {
        if (e.response.status === 500) {
          await ctx.reply(INTERNAL_ERROR);
          throw new InternalServerErrorException();
        }
        if (e.response.status === 404) {
          await ctx.reply(NOT_FOUND);
          throw new NotFoundException();
        }
      } else {
        await ctx.reply(BAD_REQUEST);
        throw new BadRequestException();
      }
    }
  }

  async registerWithTelegram(dto: RegisterTelegramDtoRequest) {
    try {
      const { data } = await this.$axios.post<RegisterTelegramDtoResponse>(
        '/telegram-users/registration',
        {
          data: { ...dto },
        },
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async getUserByPhone(phone: string) {
    try {
      const { data: user } = await this.$axios.get(`/user-phone/${phone}`);
      return user;
    } catch (e) {}
  }

  async registration(
    ctx: TelegrafContext,
    email: string,
    password: string,
    username: string,
  ): Promise<IRegisterData> {
    try {
      const { data: registerData } = await this.$axios.post<IRegisterData>(
        `/auth/local/register`,
        {
          username,
          email,
          password,
          registered_from_bot: true,
          telegram_id: ctx.from.id,
        },
      );
      return registerData;
    } catch (e) {
      await ctx.reply('Такой email уже занят.Введите другой.');
    }
  }

  async signIn(
    ctx: TelegrafContext,
    identifier: string,
    password: string,
  ): Promise<ISignInData> {
    try {
      const { data: signInData } = await this.$axios.post<ISignInData>(
        '/auth/local',
        {
          identifier,
          password,
        },
      );
      return signInData;
    } catch (e) {
      console.log(e);
      await ctx.reply(
        'Неверные данные',
        getInlineButtons([
          {
            data: Commands['sign-in'],
            text: 'Попробовать снова.',
          },
          {
            data: Commands.start,
            text: 'Перейти в главное меню',
          },
        ]),
      );
    }
  }
}
