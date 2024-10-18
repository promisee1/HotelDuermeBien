import { Sequelize } from 'sequelize';

// Constante de conexión a la base de datos
const sequelize = new Sequelize('db_duermebien', 'root', '', {
  host: 'localhost',
  port: 3306, // He elegido el puerto 3306, puedes cambiarlo si necesitas usar 3307
  dialect: 'mysql' // Cambia el dialecto si usas otra base de datos (por ejemplo, 'postgres', 'sqlite')
});

export default sequelize;
