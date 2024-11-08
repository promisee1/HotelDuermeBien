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
    type: DataTypes.STRING,
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
  estado_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'habitaciones',
  timestamps: false
});

export default Habitacion;