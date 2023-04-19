export class BidFulFillmentDto {
  service: Service;
  service_id: number;
  contacts: Contacts;
}

export interface Service {
  id: number;
  name: string;
  reply_time: any;
  start_in_days: any;
  price: any;
  placed_at: string;
  text: any;
  createdAt: string;
  updatedAt: string;
  pin_position: number;
  pin_attachment_start_at: string;
  pin_attachment_finish_at: string;
  pin_select: any;
  pin_select_start_at: string;
  pin_select_finish_at: string;
  description: string;
  region: any;
  supply: any;
  credit: any;
  demo: any;
  app_list: any;
  portfolio_url: any;
  experience: any;
  course_duration: any;
  learning_format: any;
  users_count: any;
  collection_period: any;
  additional_tools: any;
  hairs_color: any;
  eyes_color: any;
  one_unit_of_work: any;
  price_info: any;
  discount: any;
  model_characteristics: any;
  index_service: any;
  counter: Counter[];
  course_link: any;
  minimum_volume: any;
  product_category: any;
  trial_period: any;
  catalog_url: any;
  stm: any;
  trial_lesson: any;
  installment: any;
  tariff: any;
  additional_services: any;
  request: any;
  services: Services;
  collaboration_type: any;
  stock_space: any;
  delivery_period: any;
  publishedAt: string;
  advantages: any;
  features: any;
  tariff_analytics: any;
  videos: any;
  premium_tariff: any;
  volume_type: any;
  pin_description: string;
  pin_title: string;
  special_offer: SpecialOffer;
  checked_sellershub: boolean;
  work_schedule: string;
  recommended_sellershub: boolean;
  sellershub_rate: number;
  sellershub_title: string;
  profile: Profile;
}

export interface Counter {
  day: string;
  counter: number;
}

export interface Services {
  marking: boolean;
  'pick-up': boolean;
  'wrap-up': boolean;
  shipment: boolean;
  'marriage-check': boolean;
  'acceptance-things': boolean;
  'warehouse-storage': boolean;
  'working-with-returns': boolean;
}

export interface SpecialOffer {
  title: string;
  subtitle: string;
  button_text: string;
}

export interface Contacts {
  telegram_username: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export interface Profile {
  contact_telegram: 't.me/mpr_sales';
}
