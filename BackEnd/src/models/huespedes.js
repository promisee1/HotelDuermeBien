import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';


//Objeto de la entidad huespedes
const Huespedes = sequelize.define('Huesped', {
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
  ,
  numero_contacto: {
    type: DataTypes.STRING,
    allowNull: false
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: false
      },
      es_responsable: {
        type: DataTypes.TINYINT,
        allowNull: false
        }
}, {
  tableName: 'huespedes',
  timestamps: false
});

export default Huespedes;