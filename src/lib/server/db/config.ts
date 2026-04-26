import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: import.meta.env.DB_HOST,
  port: Number(import.meta.env.DB_PORT || 3306),
  user: import.meta.env.DB_USER,
  password: import.meta.env.DB_PASSWORD,
  database: import.meta.env.DB_NAME,
});

// export const db = mysql.createPool({
//   host: '127.0.0.1',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'astrotest',
// });
