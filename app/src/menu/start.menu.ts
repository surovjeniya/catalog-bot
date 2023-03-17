import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';

export const startMenu = (ctx: TelegrafContext) => {
  let menu = [];

  if (ctx.session.jwt) {
    menu = [
      [
        {
          text: '🚚 Индивидуальный заказ',
          callback_data: Commands.personal,
        },
        {
          text: '➕ Разместить услугу',
          callback_data: Commands['create-service'],
        },
      ],
      [
        {
          text: '🗃️ Каталог',
          callback_data: Commands.catalog,
        },
      ],
      [
        {
          text: '🤖 AI-копирайтер',
          callback_data: Commands.ai,
        },
      ],
      [
        {
          text: '🤝 Поддержка',
          callback_data: Commands.support,
        },
      ],
    ];
  } else {
    menu = [
      [
        {
          text: '🎫 Регистрация',
          callback_data: Commands.register,
        },
        {
          text: '🚪 Вход',
          callback_data: Commands['sign-in'],
        },
      ],
      [
        {
          text: '🚚 Индивидуальный заказ',
          callback_data: Commands.personal,
        },
        {
          text: '➕ Разместить услугу',
          callback_data: Commands['create-service'],
        },
      ],
      [
        {
          text: '🗃️ Каталог',
          callback_data: Commands.catalog,
        },
      ],
      [
        {
          text: '🤖 AI-копирайтер',
          callback_data: Commands.ai,
        },
      ],
      [
        {
          text: '🤝 Поддержка',
          callback_data: Commands.support,
        },
      ],
    ];
  }
  return menu;
};
