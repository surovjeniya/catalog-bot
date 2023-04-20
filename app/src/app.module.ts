import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppUpdate } from './app.update';
import { getTelegrafConfig } from './config/telegraf.config';
import { RegisterUpdate } from './update/register.update';
import { SellersHubBotApi } from './utils/api-class.utils';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { InviteUserModule } from './invite-user/invite-user.module';
import { AiModule } from './ai/ai.module';
import { ChatModule } from './chat/chat.module';
import { CatalogModule } from './catalog/catalog.module';
import { ServiceModule } from './service/service.module';
import { MenuModule } from './menus/menu.module';
import { PersonalModule } from './personal/personal.module';
import { SupportModule } from './support/support.module';
import { SignInModule } from './sign-in/sign-in.module';
import { FastReviewModule } from './fast-review/fast-review.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        port: configService.get('POSTGRES_PORT'),
        host: configService.get('POSTGRES_HOST'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
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
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        NODE_ENV: Joi.string().required(),
        INFOGRAPHIC_CHAT_ID: Joi.string().required(),
        MANAGER_CHAT_ID: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    // MailingModule,
    AuthModule,
    FastReviewModule,
    MenuModule,
    ServiceModule,
    PersonalModule,
    CatalogModule,
    ChatModule,
    AiModule,
    InviteUserModule,
    UserModule,
    LoggerModule,
    SupportModule,
    SignInModule,
  ],
  providers: [AppUpdate, RegisterUpdate, SellersHubBotApi],
})
export class AppModule {}
