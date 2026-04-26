import { RowDataPacket } from 'mysql2';
export type BrandDescriptionRow = RowDataPacket & {
  brands_name: string;
  brands_description: string;
};
