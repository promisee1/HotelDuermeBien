import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Reserva = sequelize.define(
  "Reserva",
  {
    id_reserva: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    huespedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    habitacionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaEntrada: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fechaSalida: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "reservas",
    timestamps: false,
  }
);

export default Reserva;
