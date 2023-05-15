export class SearchDesignerDto {
    design?: string[];
    services?: string[];
    quantity?: string[];
    priceNumber?: number;
    price?: boolean;
    description?: string;
    contacts: {
      tg?: string;
      whatsapp?: string;
    };
}