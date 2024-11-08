import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const HistorialHabitaciones = sequelize.define('HistorialHabitaciones',{
    id_historial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_habitacion: {
        type: DataTypes.INTEGER,
        allowNull: false   
    },
    id_estado_anterior: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_estado_nuevo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_cambio: {
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'historial_habitaciones',
    timestamps: false
});

export default HistorialHabitaciones;