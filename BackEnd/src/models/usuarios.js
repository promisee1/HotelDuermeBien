import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';  // Asegúrate de usar `.js` en las rutas de ES Modules


//Objeto de la entidad Usuario
const Usuario = sequelize.define('User', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true

  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  contrasena: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios',  // Nombre de la tabla en la base de datos
  timestamps: false,      // Desactiva las columnas createdAt y updatedAt si no las usas
});

export default Usuario;
