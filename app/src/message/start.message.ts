import { TelegrafContext } from 'src/interface/telegraf.context';

export const startMessage = (ctx: TelegrafContext) => {
  return `Добро пожаловать, ${ctx.from.first_name}, в бот платформы sellershub.ru!\nНаша цель - помочь селлерам и специалистам найти друг друга!\nЗдесь вы сможете:\n⚡️ зарегистрироваться, не заходя на сайт;\n⚡️ разместить услугу в нашем каталоге бесплатно;\n⚡️ заказать услугу и найти топового исполнителя.`;
};

export const YOU_EXIT = 'Вы вышли.Перезагрузите бот.';
