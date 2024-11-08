import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const EstadoHabitacion = sequelize.define('EstadoHabitacion', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, {
    tableName: 'estados_habitacion',
    timestamps: false
    });

    export default EstadoHabitacion;