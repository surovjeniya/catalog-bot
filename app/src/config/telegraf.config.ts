import { ConfigService } from '@nestjs/config';
import { TelegrafModuleOptions } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import * as path from 'path';
import { join } from 'path';
import { mkdir, existsSync } from 'fs';

const sessionLib = join(__dirname, '..', '..', './src', './sessions');
if (!existsSync(sessionLib)) {
  mkdir(sessionLib, () => {});
}

export const sessions = new LocalSession({
  database:
    process.env.NODE_ENV === 'production'
      ? path.join(sessionLib, 'sessions.json')
      : path.join(sessionLib, 'sessions.development.json'),
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
