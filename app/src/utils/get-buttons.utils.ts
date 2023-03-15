import { Markup } from 'telegraf';

export const getButtons = (
  items: {
    text: string;
    data: string;
  }[],
  columns?: number,
) => {
  return Markup.keyboard(
    [...items.map((item) => Markup.button.callback(item.text, item.data))],
    {
      columns,
    },
  );
};

export const getInlineButtons = (
  items: {
    text: string;
    data: string;
  }[],
  columns?: number,
) => {
  return Markup.inlineKeyboard(
    [...items.map((item) => Markup.button.callback(item.text, item.data))],
    {
      columns,
    },
  );
};
