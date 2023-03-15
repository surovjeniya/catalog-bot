export interface Discount {
  position_count_of_discount: string;
}

export interface Counter {
  day: string;
  counter: number;
}

export interface MinimumVolume {
  param?: any;
}

export interface ProductCategory {
  cloth: boolean;
  product: boolean;
  bulky_product: boolean;
}

export interface Services {
  marking: boolean;
  'pick-up': boolean;
  'wrap-up': boolean;
  shipment: boolean;
  'acceptance-things': boolean;
  'warehouse-storage': boolean;
  'marriage-check'?: boolean;
  ' working-with-returns?': boolean;
}

export interface CollaborationType {
  fbo: boolean;
  fbs: boolean;
}

export interface DeliveryRegion {
  city: string;
  country: string;
}

export interface StockRegion {
  _id: string;
  text: string;
  coordinates: number[];
}

export interface TakenRegion {
  city: string;
  country: string;
}

export interface DeliveryPeriod {
  day: boolean;
  three_day: boolean;
  day_and_half: boolean;
}

export interface Previews {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface Services2 {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface PriceFile {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
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

export interface StockSpace {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface StockRegion2 {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface TakenRegion2 {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface DeliveryRegion2 {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface ProductCategory2 {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface CollaborationType2 {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface Fields {
  previews: Previews;
  services: Services2;
  price_file: PriceFile;
  description: Description;
  marketplace: Marketplace;
  stock_space: StockSpace;
  stock_region: StockRegion2;
  taken_region: TakenRegion2;
  delivery_region: DeliveryRegion2;
  product_category: ProductCategory2;
  collaboration_type: CollaborationType2;
}

export interface Dataset {
  fields: Fields;
  groups: string[];
}

export interface Option {
  title: string;
  value: any;
}

export interface Field {
  name: string;
  title: string;
}

export interface Filter {
  name: string;
  type: string;
  title: string;
  option: Option[];
  fields: Field[];
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  ui_code?: any;
  dataset: Dataset;
  description: string;
  sort_index?: any;
  prices?: any;
  filters: Filter[];
}

export interface Location {
  city: string;
  country: string;
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

export interface Avatar {
  id: number;
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
  folderPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  id: number;
  intro?: any;
  portfolio_url: string;
  contact_telegram: string;
  reply_time: string;
  education_list: any[];
  certificates_list?: any;
  invite_email?: any;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  nickname?: any;
  real_name?: any;
  contact_viber?: any;
  contact_whatsup: string;
  phone_number: string;
  location: Location;
  activity: string;
  first_name: string;
  last_name?: any;
  company: string;
  company_code: string;
  contact_vk?: any;
  contact_instagram?: any;
  description: string;
  index_profile: number;
  contact_email: string;
  counter: any;
  profile_type: string;
  referral_id?: any;
  avatar: Avatar;
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

export interface Medium2 {
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
  medium: Medium2;
  thumbnail: Thumbnail2;
}

export interface Preview {
  id: number;
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
  folderPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  rating: number;
}

export interface MarketplacePreview {
  id: number;
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
  folderPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Image {
  id: number;
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
  folderPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Marketplace2 {
  id: number;
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
  name: string;
  reply_time: string;
  start_in_days?: number;
  price?: any;
  placed_at?: Date;
  text?: any;
  createdAt: Date;
  updatedAt: Date;
  pin_position: number;
  pin_attachment_start_at: Date;
  pin_attachment_finish_at: Date;
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
  price_info?: any;
  discount: Discount;
  model_characteristics?: any;
  index_service: number;
  counter: Counter[];
  course_link?: any;
  minimum_volume: MinimumVolume;
  product_category: ProductCategory;
  trial_period?: any;
  catalog_url?: any;
  stm?: any;
  trial_lesson?: any;
  installment?: any;
  tariff?: any;
  additional_services?: any;
  request?: any;
  services: Services;
  collaboration_type: CollaborationType;
  delivery_region: DeliveryRegion[];
  stock_region: StockRegion[];
  taken_region: TakenRegion[];
  stock_space: number;
  delivery_period: DeliveryPeriod;
  publishedAt: Date;
  advantages?: any;
  features?: any;
  tariff_analytics?: any;
  videos?: any;
  premium_tariff?: any;
  service_categories: ServiceCategory[];
  profile: Profile;
  previews: Preview[];
  review: Review[];
  marketplace: Marketplace2[];
  avgRating: any;
}

export interface ITopServices {
  data: Datum[];
}
