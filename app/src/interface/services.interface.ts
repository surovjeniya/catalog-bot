export interface Region {
  city: string;
  country: string;
}

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

export interface Stm {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Region2 {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Supply {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface Discount {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Previews {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface PriceInfo2 {
  group: string;
  active: boolean;
  required: boolean;
}

export interface CatalogUrl {
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

export interface StartInDays {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface ProductCategory {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface Services {
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

export interface StockRegion {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface TakenRegion {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface DeliveryRegion {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface CollaborationType {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface UsersCount {
  group: string;
  active: boolean;
  required: boolean;
}

export interface TrialPeriod {
  group: string;
  active: boolean;
  required: boolean;
}

export interface AdditionalTools {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Videos {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Features {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Advantages {
  group: string;
  active: boolean;
  required: boolean;
}

export interface TariffAnalytics {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Experience {
  group: string;
  active: boolean;
  required: boolean;
}

export interface ServiceTags {
  group: string;
  active: boolean;
  required: boolean;
}

export interface PortfolioUrl {
  group: string;
  active: boolean;
  required: boolean;
}

export interface LearningFormat {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Fields {
  stm: Stm;
  region: Region2;
  supply: Supply;
  discount: Discount;
  previews: Previews;
  price_info: PriceInfo2;
  catalog_url: CatalogUrl;
  description: Description;
  start_in_days: StartInDays;
  product_category: ProductCategory;
  services: Services;
  price_file: PriceFile;
  marketplace: Marketplace;
  stock_space: StockSpace;
  stock_region: StockRegion;
  taken_region: TakenRegion;
  delivery_region: DeliveryRegion;
  collaboration_type: CollaborationType;
  users_count: UsersCount;
  trial_period: TrialPeriod;
  additional_tools: AdditionalTools;
  videos: Videos;
  features: Features;
  advantages: Advantages;
  tariff_analytics: TariffAnalytics;
  experience: Experience;
  service_tags: ServiceTags;
  portfolio_url: PortfolioUrl;
  learning_format: LearningFormat;
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
  max?: number;
  min?: number;
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
  sort_index?: number;
  prices?: any;
  filters: Filter[];
}

export interface Location {
  city: string;
  country: string;
}

export interface Counter2 {
  day: string;
  counter: number;
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

export interface Formats {
  small: Small;
  thumbnail: Thumbnail;
  medium: Medium;
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
  invite_email: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  nickname: string;
  real_name: string;
  contact_viber?: any;
  contact_whatsup: string;
  phone_number: string;
  location: Location;
  activity: string;
  first_name: string;
  last_name: string;
  company?: any;
  company_code?: any;
  contact_vk: string;
  contact_instagram: string;
  description: string;
  index_profile?: number;
  contact_email: string;
  counter: Counter2[];
  profile_type: string;
  referral_id?: any;
  avatar: Avatar;
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

export interface Formats2 {
  thumbnail: Thumbnail2;
  small: Small2;
  medium: Medium2;
  large: Large;
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
  description: string;
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
  price?: number;
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
  region: Region;
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
  index_service?: any;
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
  service_categories: ServiceCategory[];
  profile: Profile;
  review: any[];
  previews: Preview[];
  marketplace: Marketplace2[];
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: Pagination;
}

export interface IServices {
  data: Datum[];
  meta: Meta;
}
