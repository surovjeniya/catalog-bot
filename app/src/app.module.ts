import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { TelegrafModule } from 'nestjs-telegraf';
import { CommandModule } from './command/command.module';
import { getTelegrafConfig } from './config/telegraf.config';
import { getTypeOrmConfig } from './config/typeorm.config';
import { OnModule } from './on/on.module';
import { Api } from './utils/api.utils';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getTypeOrmConfig(configService),
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
    CommandModule,
    OnModule,
  ],
  providers: [Api],
})
export class AppModule {}
