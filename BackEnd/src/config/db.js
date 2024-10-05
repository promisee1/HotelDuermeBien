// db.js - Archivo de conexión a la base de datos
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'db_duermebien',
  password: '',
  port: 3306,
});

export const query = async (text, params) => {
  const [rows] = await pool.execute(text, params);
  return rows;
};