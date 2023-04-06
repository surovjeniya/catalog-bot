export const getSellerCase = (text: string) => {
  const lowerText = text.toLowerCase();

  const sellerCase =
    lowerText.match('требуеться') ||
    lowerText.match('требуются') ||
    lowerText.match('требуется') ||
    lowerText.match('нужен') ||
    lowerText.match('ищу');
  return sellerCase;
};

export const getSpammerCase = (text: string) => {
  const lowerText = text.toLowerCase();

  const spammerCase =
    lowerText.match('обучение с нуля') ||
    lowerText.match('работа с телефона') ||
    lowerText.match('хочу работать с телефона') ||
    lowerText.match('требуется работа с телефона');
  return spammerCase;
};
