import { type RowDataPacket } from 'mysql2';
export type ConfigurationRow = RowDataPacket & {
  config_key: string;
  config_value: string;
};
