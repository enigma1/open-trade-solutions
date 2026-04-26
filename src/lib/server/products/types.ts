import type { RowDataPacket } from 'mysql2';

export type ProductInfoRow = RowDataPacket & {
  products_id: number;
  products_model: string;
  products_status: number;
  products_name: string;
  products_description: string;
  products_price: number;
  products_date_added: Date;
  products_image: string;
};

export type ProductSpecialRow = RowDataPacket & {
  products_id: number;
  special_price: number;
  end_date: Date;
};

export type ProductDescriptionRow = RowDataPacket & {
  products_name: string;
  products_description: string;
};
