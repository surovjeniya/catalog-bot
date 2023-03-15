import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import * as path from 'path';

const sessions = new LocalSession({
  database: path.join('sessions.json'),
});

export const getTelegrafConfig = (
  configService: ConfigService,
): TelegrafModuleOptions => {
  const config: TelegrafModuleOptions = {
    token: configService.get('TOKEN'),
    middlewares: [sessions],
  };
  return config;
};
