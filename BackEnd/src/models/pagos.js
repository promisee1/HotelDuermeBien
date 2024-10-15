import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


//Objeto de la entidad Pagos
const Pago = sequelize.define('Pago', {
  id_pago: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_reserva: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  monto: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  metodo_pago: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_pago: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'pagos',
  timestamps: false
});

export default Pago;
