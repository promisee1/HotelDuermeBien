import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'benjaja',
  password: 'dev123',
  database: 'db_duermebien',
  port: 3306
});

export const query = async (sql, params) => {
  const [results] = await pool.execute(sql, params);
  return results;
};
