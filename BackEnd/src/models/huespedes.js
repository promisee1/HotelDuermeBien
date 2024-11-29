import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Reserva from "./reservas.js"; // Importa el modelo de Reservas

// Definición del modelo de Huéspedes
const Huespedes = sequelize.define(
  "Huesped",
  {
    id_huesped: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RUT: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegura que el RUT no se repita
    },
    numero_contacto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Valida que el formato sea un correo electrónico válido
      },
    },
    es_responsable: {
      type: DataTypes.BOOLEAN, // Cambia a boolean para facilitar operaciones lógicas
      allowNull: false,
      defaultValue: false, // Por defecto, no es responsable
    },
  },
  {
    tableName: "huespedes", // Nombre de la tabla en la base de datos
    timestamps: false, // Evita las columnas de createdAt y updatedAt
  }
);

// Relación con Reservas
Huespedes.hasMany(Reserva, { foreignKey: "huespedId" }); // Un huésped puede tener muchas reservas

export default Huespedes;
