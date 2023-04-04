export class BidFulFillmentDto {
  service_id: number;
  contacts: {
    telegram_username?: string;
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
}
