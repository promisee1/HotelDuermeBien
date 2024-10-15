import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


//Objeto de la entidad huespedes
const Huesped = sequelize.define('Huesped', {
  id_huesped: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  RUT: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'huespedes',
  timestamps: false
});

export default Huesped;
