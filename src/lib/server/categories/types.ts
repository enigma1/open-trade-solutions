import { RowDataPacket } from 'mysql2';
export type CategoryDescriptionRow = RowDataPacket & {
  categories_name: string;
  categories_description: string;
};
export type CategoryPathItem = {
  categories_id: number;
  parent_id: number;
};
