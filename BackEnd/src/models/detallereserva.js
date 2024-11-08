import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


//Objeto de la entidad detalleReserva
const DetalleReserva = sequelize.define('DetalleReserva', {
  id_detalle_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_reserva: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_habitacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numero_huespedes: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'detallereservas',
  timestamps: false
});

export default DetalleReserva;