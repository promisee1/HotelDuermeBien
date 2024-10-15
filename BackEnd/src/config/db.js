import { Sequelize } from 'sequelize';


//Constante de conexión a la base de datos
const sequelize = new Sequelize('db_duermebien', 'benjaja', 'benjadev', {
  host: 'localhost',
  dialect: 'mysql' // Cambia el dialecto si usas otra base de datos (por ejemplo, 'postgres', 'sqlite')
});

export default sequelize;
