import { Commands } from 'src/enum/commands.enum';
import { TelegrafContext } from 'src/interface/telegraf.context';

export const getStartMenu = (
  ctx: TelegrafContext,
): {
  text: string;
  data: Commands;
}[] => {
  let menu = [];
  if (ctx.session.jwt) {
    menu = [
      {
        text: 'Персональный подбор специалиста',
        data: Commands.personal,
      },
      {
        text: 'Каталог',
        data: Commands.catalog,
      },
      {
        text: 'Разместить услугу',
        data: Commands['create-service'],
      },
    ];
  } else {
    menu = [
      {
        text: 'Персональный подбор специалиста',
        data: Commands.personal,
      },
      {
        text: 'Каталог',
        data: Commands.catalog,
      },
      {
        text: 'Разместить услугу',
        data: Commands['create-service'],
      },
      {
        text: 'Регистрация',
        data: Commands.register,
      },
      {
        text: 'Вход',
        data: Commands['sign-in'],
      },
    ];
  }
  return menu;
};
