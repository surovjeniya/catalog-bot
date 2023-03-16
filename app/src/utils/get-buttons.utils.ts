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
  items?: {
    text: string;
    url?: string;
    data?: string;
  }[],
  columns?: number,
) => {
  return Markup.inlineKeyboard(
    [
      ...items.map((item) => {
        if (item.url) {
          return Markup.button.url(item.text, item.data);
        }
        if (item.data) {
          return Markup.button.callback(item.text, item.data);
        }
      }),
    ],
    {
      columns,
    },
  );
};
