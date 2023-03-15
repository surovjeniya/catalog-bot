export interface PriceInfo {
  free: boolean;
  param: string;
  value: string;
  negotiated: boolean;
}

export interface Counter {
  day: string;
  counter: number;
}

export interface Attributes3 {
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

export interface Data2 {
  id: number;
  attributes: Attributes3;
}

export interface MarketplacePreview {
  data: Data2;
}

export interface Attributes4 {
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
  attributes: Attributes4;
}

export interface Image {
  data: Data3;
}

export interface Attributes2 {
  title: string;
  description?: any;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  marketplace_preview: MarketplacePreview;
  image: Image;
}

export interface Datum {
  id: number;
  attributes: Attributes2;
}

export interface Marketplace {
  data: Datum[];
}

export interface Large {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Thumbnail {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Formats {
  large: Large;
  small: Small;
  medium: Medium;
  thumbnail: Thumbnail;
}

export interface Attributes5 {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats: Formats;
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

export interface Datum2 {
  id: number;
  attributes: Attributes5;
}

export interface Previews {
  data: Datum2[];
}

export interface Discount {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Previews2 {
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

export interface Marketplace2 {
  group: string;
  active: boolean;
  required: boolean;
}

export interface ServiceTags {
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
  discount: Discount;
  previews: Previews2;
  price_info: PriceInfo2;
  description: Description;
  marketplace: Marketplace2;
  service_tags: ServiceTags;
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

export interface Attributes6 {
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
}

export interface Datum3 {
  id: number;
  attributes: Attributes6;
}

export interface ServiceCategories {
  data: Datum3[];
}

export interface Counter2 {
  day: string;
  counter: number;
}

export interface PriceInfo3 {
  free: boolean;
  param: string;
  value: string;
  negotiated: boolean;
}

export interface Counter3 {
  day: string;
  counter: number;
}

export interface Review {
  data: any[];
}

export interface Attributes8 {
  name: string;
  reply_time: string;
  start_in_days: number;
  price?: any;
  placed_at: Date;
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
  portfolio_url: string;
  experience?: any;
  course_duration?: any;
  learning_format?: any;
  users_count?: any;
  collection_period?: any;
  additional_tools?: any;
  hairs_color?: any;
  eyes_color?: any;
  one_unit_of_work?: any;
  price_info: PriceInfo3;
  discount?: any;
  model_characteristics?: any;
  index_service: number;
  counter: Counter3[];
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
}

export interface Datum4 {
  id: number;
  attributes: Attributes8;
}

export interface Services {
  data: Datum4[];
}

export interface Small2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Thumbnail2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

export interface Formats2 {
  small: Small2;
  thumbnail: Thumbnail2;
}

export interface Attributes9 {
  name: string;
  alternativeText?: any;
  caption?: any;
  width: number;
  height: number;
  formats: Formats2;
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

export interface Data5 {
  id: number;
  attributes: Attributes9;
}

export interface Avatar {
  data: Data5;
}

export interface Attributes7 {
  intro: string;
  portfolio_url: string;
  contact_telegram: string;
  reply_time: string;
  education_list?: any;
  certificates_list?: any;
  invite_email?: any;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  nickname: string;
  real_name: string;
  contact_viber?: any;
  contact_whatsup?: any;
  phone_number?: any;
  location?: any;
  activity?: any;
  first_name: string;
  last_name?: any;
  company?: any;
  company_code?: any;
  contact_vk?: any;
  contact_instagram?: any;
  description: string;
  index_profile: number;
  contact_email?: any;
  counter: Counter2[];
  profile_type?: any;
  referral_id?: any;
  services: Services;
  avatar: Avatar;
  averageRating: number;
}

export interface Data4 {
  id: number;
  attributes: Attributes7;
}

export interface Profile {
  data: Data4;
}

export interface Attributes10 {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
}

export interface Datum5 {
  id: number;
  attributes: Attributes10;
}

export interface ServiceTags2 {
  data: Datum5[];
}

export interface Review2 {
  data: any[];
}

export interface PriceFile {
  data?: any;
}

export interface Materials {
  data?: any;
}

export interface Attributes {
  name: string;
  reply_time: string;
  start_in_days: number;
  price?: any;
  placed_at: Date;
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
  portfolio_url: string;
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
  discount?: any;
  model_characteristics?: any;
  index_service: number;
  counter: Counter[];
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
  marketplace: Marketplace;
  previews: Previews;
  service_categories: ServiceCategories;
  profile: Profile;
  service_tags: ServiceTags2;
  review: Review2;
  price_file: PriceFile;
  materials: Materials;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface IService {
  data: Data;
}
