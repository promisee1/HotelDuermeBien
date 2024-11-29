import Reserva from "../models/reservas.js";

// Obtener todas las reservas
export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll();
    res.status(200).json(reservas);
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// Crear una nueva reserva
export const crearReserva = async (req, res) => {
    const { huespedId, habitacionId, fechaEntrada, fechaSalida } = req.body;
  
    if (!huespedId || !habitacionId || !fechaEntrada || !fechaSalida) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
  
    try {
      const nuevaReserva = await Reserva.create({
        huespedId,
        habitacionId,
        fechaEntrada,
        fechaSalida,
      });
      res.status(201).json(nuevaReserva);
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      res.status(500).json({ message: "Error al crear la reserva" });
    }
  };