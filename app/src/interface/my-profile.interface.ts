export interface Location {
  city?: any;
  country?: any;
}

export interface Counter {
  post: number;
  review: number;
  comments: number;
  questions: number;
}

export interface Avatar {
  data?: any;
}

export interface PriceInfo {
  value: number;
  negotiated: boolean;
}

export interface Discount {
  position_count_of_discount: string;
}

export interface Review {
  data: any[];
}

export interface ServiceTags {
  data: any[];
}

export interface Discount2 {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Previews {
  group: string;
  active: boolean;
  required: boolean;
}

export interface PriceInfo2 {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Description {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface Marketplace {
  group: string;
  active: boolean;
  required: boolean;
}

export interface ServiceTags2 {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface StartInDays {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface Fields {
  discount: Discount2;
  previews: Previews;
  price_info: PriceInfo2;
  description: Description;
  marketplace: Marketplace;
  service_tags: ServiceTags2;
  start_in_days: StartInDays;
}

export interface Dataset {
  fields: Fields;
  groups: string[];
}

export interface Option {
  title: string;
  value: number;
}

export interface Filter {
  name: string;
  type: string;
  title: string;
  option: Option[];
  max?: number;
  min?: number;
}

export interface Attributes4 {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  ui_code?: any;
  dataset?: any;
  description: string;
  sort_index: number;
  prices?: any;
  filters?: any;
}

export interface Data2 {
  id: number;
  attributes: Attributes4;
}

export interface ParentCategory {
  data: Data2;
}

export interface Attributes3 {
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  ui_code?: any;
  dataset: Dataset;
  description: string;
  sort_index: number;
  prices?: any;
  filters: Filter[];
  parent_category: ParentCategory;
}

export interface Datum2 {
  id: number;
  attributes: Attributes3;
}

export interface ServiceCategories {
  data: Datum2[];
}

export interface Attributes6 {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Data3 {
  id: number;
  attributes: Attributes6;
}

export interface MarketplacePreview {
  data: Data3;
}

export interface Attributes7 {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface Data4 {
  id: number;
  attributes: Attributes7;
}

export interface Image {
  data: Data4;
}

export interface Attributes5 {
  title: string;
  description?: any;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  marketplace_preview: MarketplacePreview;
  image: Image;
}

export interface Datum3 {
  id: number;
  attributes: Attributes5;
}

export interface Marketplace2 {
  data: Datum3[];
}

export interface Previews2 {
  data?: any;
}

export interface Attributes2 {
  name: string;
  reply_time?: any;
  start_in_days?: any;
  price: number;
  placed_at?: any;
  text?: any;
  createdAt: Date;
  updatedAt: Date;
  pin_position?: any;
  pin_attachment_start_at?: any;
  pin_attachment_finish_at?: any;
  pin_select?: any;
  pin_select_start_at?: any;
  pin_select_finish_at?: any;
  description: string;
  region?: any;
  supply?: any;
  credit?: any;
  demo?: any;
  app_list?: any;
  portfolio_url?: any;
  experience?: any;
  course_duration?: any;
  learning_format?: any;
  users_count?: any;
  collection_period?: any;
  additional_tools?: any;
  hairs_color?: any;
  eyes_color?: any;
  one_unit_of_work?: any;
  price_info: PriceInfo;
  discount: Discount;
  model_characteristics?: any;
  index_service: number;
  counter?: any;
  course_link?: any;
  minimum_volume?: any;
  product_category?: any;
  trial_period?: any;
  catalog_url?: any;
  stm?: any;
  trial_lesson?: any;
  installment?: any;
  tariff?: any;
  additional_services?: any;
  request?: any;
  services?: any;
  collaboration_type?: any;
  delivery_region?: any;
  stock_region?: any;
  taken_region?: any;
  stock_space?: any;
  delivery_period?: any;
  publishedAt: Date;
  advantages?: any;
  features?: any;
  tariff_analytics?: any;
  videos?: any;
  premium_tariff?: any;
  volume_type?: any;
  review: Review;
  service_tags: ServiceTags;
  service_categories: ServiceCategories;
  marketplace: Marketplace2;
  previews: Previews2;
}

export interface Datum {
  id: number;
  attributes: Attributes2;
}

export interface Services {
  data: Datum[];
}

export interface Attributes {
  intro?: any;
  portfolio_url?: any;
  contact_telegram: string;
  reply_time?: any;
  education_list?: any;
  certificates_list?: any;
  invite_email?: any;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  nickname: string;
  real_name?: any;
  contact_viber?: any;
  contact_whatsup?: any;
  phone_number?: any;
  location: Location;
  activity: string;
  first_name: string;
  last_name: string;
  company?: any;
  company_code?: any;
  contact_vk?: any;
  contact_instagram?: any;
  description?: any;
  index_profile: number;
  contact_email?: any;
  counter: Counter;
  profile_type: string;
  referral_id: string;
  avatar: Avatar;
  services: Services;
}

export interface Data {
  id: number;
  attributes: Attributes;
  averageRating: number;
}

export interface IMyProfile {
  data: Data;
}
