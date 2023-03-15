export interface Region {
  group: string;
  active: boolean;
  required: boolean;
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

export interface Experience {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface PriceInfo {
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

export interface ServiceTags {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface PortfolioUrl {
  group: string;
  active: boolean;
  required: boolean;
  placeholder: string;
}

export interface StartInDays {
  group: string;
  active: boolean;
  required: boolean;
  palceholder: string;
  placeholder: string;
}

export interface LearningFormat {
  group: string;
  active: boolean;
  required: boolean;
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

export interface ProductCategory {
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

export interface Cases {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Stm {
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

export interface CatalogUrl {
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

export interface AdditionalTools {
  group: string;
  active: boolean;
  required: boolean;
}

export interface TariffAnalytics {
  group: string;
  active: boolean;
  required: boolean;
}

export interface UsersCount {
  group: string;
  active: boolean;
  required: boolean;
}

export interface MinimumVolume {
  group: string;
  active: boolean;
  required: boolean;
}

export interface DeliveryPeriod {
  group: string;
  active: boolean;
  required: boolean;
}

export interface TrialPeriod {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Tariff {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Request {
  group: string;
  active: boolean;
  required: boolean;
}

export interface AdditionalServices {
  group: string;
  active: boolean;
  required: boolean;
}

export interface Fields {
  region: Region;
  discount: Discount;
  previews: Previews;
  experience: Experience;
  price_info: PriceInfo;
  description: Description;
  marketplace: Marketplace;
  service_tags: ServiceTags;
  portfolio_url: PortfolioUrl;
  start_in_days: StartInDays;
  learning_format: LearningFormat;
  services: Services;
  price_file: PriceFile;
  stock_space: StockSpace;
  stock_region: StockRegion;
  taken_region: TakenRegion;
  delivery_region: DeliveryRegion;
  product_category: ProductCategory;
  collaboration_type: CollaborationType;
  cases: Cases;
  stm: Stm;
  supply: Supply;
  catalog_url: CatalogUrl;
  videos: Videos;
  features: Features;
  advantages: Advantages;
  additional_tools: AdditionalTools;
  tariff_analytics: TariffAnalytics;
  users_count: UsersCount;
  minimum_volume: MinimumVolume;
  delivery_period: DeliveryPeriod;
  trial_period: TrialPeriod;
  tariff: Tariff;
  request: Request;
  additional_services: AdditionalServices;
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

export interface Attributes2 {
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

export interface Data {
  id: number;
  attributes: Attributes2;
}

export interface Image {
  data: Data;
}

export interface Attributes3 {
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
  attributes: Attributes3;
}

export interface ParentCategory {
  data: Data2;
}

export interface Seo {
  id: number;
  title: string;
  description: string;
  bottom_title: string;
  bottom_description: string;
  lead?: any;
}

export interface ImageMobile {
  data?: any;
}

export interface Attributes {
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
  image: Image;
  parent_category: ParentCategory;
  seo: Seo;
  image_mobile: ImageMobile;
}

export interface Datum {
  id: number;
  attributes: Attributes;
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

export interface ICategories {
  data: Datum[];
  meta: Meta;
}
