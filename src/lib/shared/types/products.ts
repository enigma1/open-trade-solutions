type ProductDescriptionListType = {
  products_name: string;
  // [key: string]: unknown;
};

type ProductListCoreType = {
  products_id: number;
  products_status: number;
  products_image: string;
  products_name: string;
  products_price: number;
  // [key: string]: unknown; // used for wildcard selection
};
type SpecialListCoreType = {
  special_price: number;
  // [key: string]: unknown;
};

export type ProductListBaseType = {
  product: ProductListCoreType;
  special?: SpecialListCoreType;
};

export type ProductListType = ProductListBaseType & {
  content: ProductDescriptionListType;
};

// Product Full Details types

type ProductInfoCoreType = {
  products_id: number;
  products_model: string;
  products_status: number;
  products_image: string;
  products_name: string;
  products_price: number;
  products_date_added: Date;
  // [key: string]: unknown;
};

type SpecialInfoCoreType = {
  special_price: number;
  end_date: Date;
  // [key: string]: unknown;
};

type ProductDescriptionFullType = {
  products_name: string;
  products_description: string;
  // [key: string]: unknown;
};

export type ProductFullType = {
  product: ProductInfoCoreType;
  special?: SpecialInfoCoreType;
  content: ProductDescriptionFullType;
};
