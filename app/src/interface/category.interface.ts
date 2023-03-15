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
}

export interface StartInDays {
  group: string;
  active: boolean;
  required: boolean;
  palceholder: string;
}

export interface LearningFormat {
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
}

export interface Dataset {
  fields: Fields;
  groups: string[];
}

export interface Option {
  title: string;
  value: number;
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

export interface Data2 {
  id: number;
  attributes: Attributes2;
}

export interface Image {
  data: Data2;
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

export interface Data3 {
  id: number;
  attributes: Attributes3;
}

export interface ParentCategory {
  data: Data3;
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
  sort_index: number;
  prices?: any;
  filters: Filter[];
  image: Image;
  parent_category: ParentCategory;
  seo: Seo;
  image_mobile: ImageMobile;
}

export interface Data {
  id: number;
  attributes: Attributes;
}

export interface ICategory {
  data: Data;
}
