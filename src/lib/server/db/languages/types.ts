import { type RowDataPacket } from 'mysql2';
export type LanguageStringsRow = RowDataPacket & {
  string_key: string;
  string_value: string;
};
