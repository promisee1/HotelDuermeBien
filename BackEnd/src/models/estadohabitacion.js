import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const estadohabitacion = sequelize.define('estadohabitacion', {
    id_estado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'estadohabitaciones',
    timestamps: false
});
