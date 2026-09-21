import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: import.meta.env.DB_HOST,
  port: Number(import.meta.env.DB_PORT || 3306),
  user: import.meta.env.DB_USER,
  password: import.meta.env.DB_PASSWORD,
  database: import.meta.env.DB_NAME,
});

export const dbTables = {
  brands: 'brands',
  brands_description: 'brands_description',
  categories: 'categories',
  categories_description: 'categories_description',
  configuration: 'configuration',
  currencies: 'currencies',
  languages: 'languages',
  languages_strings: 'languages_strings',
  products: 'products',
  products_description: 'products_description',
  products_featured: 'products_featured',
  products_to_brands: 'products_to_brands',
  products_to_categories: 'products_to_categories',
  products_specials: 'products_specials',
  products_extra_fields: 'products_extra_fields',
  products_to_products_extra_fields: 'products_to_products_extra_fields',
  orders: 'orders',
  sessions: 'sessions',
};

export const dbAliases = {
  brands: 'pb',
  brands_description: 'bd',
  categories: 'c',
  categories_description: 'cd',
  configuration: 'cfg',
  currencies: 'cu',
  languages: 'l',
  products: 'p',
  products_featured: 'fp',
  products_description: 'pd',
  products_to_brands: 'p2b',
  products_to_categories: 'p2c',
  products_specials: 'sp',
  products_extra_fields: 'pef',
  products_to_products_extra_fields: 'p2pef',
  orders: 'o',
  sessions: 's',
};
