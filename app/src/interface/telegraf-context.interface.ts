import { Context, Telegram } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

export enum SessionActions {
  'create-service' = 'create-service',
}

export enum Commands {
  start = 'start',
  signout = 'signout',
}

export interface TelegrafContext extends Context {
  session: {
    action: SessionActions;
    jwt: string;
  };
  update: Update & {
    message: Message & {
      date: number;
      text: string;
    };
  };
  telegram: Telegram;
}
