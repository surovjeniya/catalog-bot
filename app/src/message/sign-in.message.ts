import { TelegrafContext } from 'src/interface/telegraf.context';

export const getSignInCredentials = (ctx: TelegrafContext) => {
  return `Ваши данные для входа:\nemail: ${ctx.session.login_data.identifier},\nпароль: ${ctx.session.login_data.password}.\nПрололжить?`;
};

export const ENTER_PASSWORD = 'Введите пароль.';
export const INVALID_EMAIL = 'Невалидный email.';
