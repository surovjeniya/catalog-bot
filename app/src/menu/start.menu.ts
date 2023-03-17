import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';

export const startMenu = (ctx: TelegrafContext) => {
  let menu = [];

  if (ctx.session.jwt) {
    menu = [
      [
        {
          text: 'Создать заказ',
          callback_data: Commands.personal,
        },
        {
          text: 'Разместить услугу',
          callback_data: Commands['create-service'],
        },
      ],
      [
        {
          text: 'Открыть каталог Sellershub',
          callback_data: Commands.catalog,
        },
      ],
      [
        {
          text: '🤖 Использовать AI-копирайтер',
          callback_data: Commands.ai,
        },
      ],
      [
        {
          text: '🤝 Обратиться в поддержку',
          callback_data: Commands.support,
        },
      ],
    ];
  } else {
    menu = [
      [
        {
          text: 'Зарегестрироваться',
          callback_data: Commands.register,
        },
        {
          text: 'Войти в аккаунт Sellershub',
          callback_data: Commands['sign-in'],
        },
      ],
      [
        {
          text: 'Создать заказ',
          callback_data: Commands.personal,
        },
        {
          text: 'Разместить услугу',
          callback_data: Commands['create-service'],
        },
      ],
      [
        {
          text: 'Открыть каталог Sellershub',
          callback_data: Commands.catalog,
        },
      ],
      [
        {
          text: '🤖 Использовать AI-копирайтер',
          callback_data: Commands.ai,
        },
      ],
      [
        {
          text: '🤝 Обратиться в поддержку',
          callback_data: Commands.support,
        },
      ],
    ];
  }
  return menu;
};
