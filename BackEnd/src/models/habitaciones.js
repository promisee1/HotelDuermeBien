import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


//Objeto de la entidad habitaciones
const Habitacion = sequelize.define('Habitacion', {
  id_habitacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  numero_habitacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orientacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_estado: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'habitaciones',
  timestamps: false
});

export default Habitacion;
