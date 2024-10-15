import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


//Objeto de la entidad Reserva
const Reserva = sequelize.define('Reserva', {
  id_reserva: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_huesped_responsable: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_checkin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  fecha_checkout: {
    type: DataTypes.DATE,
    allowNull: false
  },
  costo_total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'reservas',
  timestamps: false
});

export default Reserva;
