import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';
import { getTelegrafConfig } from './config/telegraf.config';
import { AiUpdate } from './update/ai.update';
import { CatalogUpdate } from './update/catalog.update';
import { ChatsUpdate } from './update/chats.update';
import { CreateServiceUpdate } from './update/create-service.update';
import { MenuUpdate } from './update/menu.update';
import { PersonalUpdate } from './update/personal.update';
import { RegisterUpdate } from './update/register.update';
import { SignInUpdate } from './update/sign-in.update';
import { SupportUpdate } from './update/support.update';
import { SellersHubBotApi } from './utils/api-class.utils';
import * as Joi from 'joi';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        getTelegrafConfig(configService),
    }),
    ConfigModule.forRoot({
      envFilePath: (process.env.NODE_ENV = 'development'
        ? './envs/.development.env'
        : './envs/.production.env'),
      isGlobal: true,
      validationSchema: Joi.object({
        TOKEN: Joi.string().required(),
        API: Joi.string().required(),
      }),
    }),
  ],
  providers: [
    AppUpdate,
    CatalogUpdate,
    PersonalUpdate,
    RegisterUpdate,
    SignInUpdate,
    SellersHubBotApi,
    CreateServiceUpdate,
    SupportUpdate,
    ChatsUpdate,
    AiUpdate,
    MenuUpdate,
  ],
})
export class AppModule {}
