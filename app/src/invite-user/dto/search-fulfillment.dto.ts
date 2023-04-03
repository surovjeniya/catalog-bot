export class SearchFulfillmentDto {
  locations?: string[];
  services?: string[];
  packaging?: string[];
  price_segment?: string[];
  description?: string;
  contacts?: {
    tg?: string;
    email?: string;
    whatsapp?: string;
  };
}
