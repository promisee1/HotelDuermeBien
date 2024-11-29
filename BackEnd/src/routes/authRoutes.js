import { Router } from 'express';

// Importes de autenticación
import { login } from '../controllers/authControllers.js';

// Importes de usuarios
import {register, eliminarUsuario, updateUsuario, getAllUsuarios } from '../controllers/authControllers.js';


//Importes de habitaciones
import { crearHabitacion, obtenerHabitaciones, eliminarHabitacion, actualizarHabitacion } from '../controllers/authControllers.js';

//Importes de huespedes
import { crearHuesped, obtenerHuespedes, eliminarHuesped, actualizarHuesped } from '../controllers/authControllers.js';
import {
  crearReserva,
  obtenerReservas,
  actualizarReserva,
  eliminarReserva,
} from "../controllers/reservasController.js";

const router = Router();

// Ruta de registro de usuarios (pública)
router.post('/register', register);

// Ruta de inicio de sesión (pública)
router.post('/login', login);

// Obtener todos los usuarios (protegiendo la ruta con el middleware de autenticación)
router.get('/usuarios', getAllUsuarios);

// Ruta protegida para eliminar un usuario
router.delete('/usuarios/:id',  eliminarUsuario);

// Ruta protegida para actualizar un usuario
router.put('/usuarios/:id', updateUsuario);

// Ruta protegida para añadir una habitación
router.post('/habitaciones', crearHabitacion);

// Ruta protegida para obtener todas las habitaciones
router.get('/habitaciones', obtenerHabitaciones);

// Ruta protegida para eliminar una habitación
router.delete('/habitaciones/:id',  eliminarHabitacion);

// Ruta protegida para actualizar una habitación
router.put('/habitaciones/:id', actualizarHabitacion);

// Ruta protegida para añadir un huesped
router.post('/huespedes', crearHuesped);

// Ruta protegida para obtener todos los huespedes
router.get('/huespedes', obtenerHuespedes);

// Ruta protegida para eliminar un huesped
router.delete('/huespedes/:id',  eliminarHuesped);

// Ruta protegida para actualizar un huesped
router.put('/huespedes/:id', actualizarHuesped);
router.post("/reservas", crearReserva); // Crear una nueva reserva
router.get("/reservas", obtenerReservas); // Obtener todas las reservas
router.put("/reservas/:id", actualizarReserva); // Actualizar una reserva
router.delete("/reservas/:id", eliminarReserva); // Eliminar una reserva


// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/perfil', (req, res) => {
  res.json({ message: `Bienvenido usuario con ID: ${req.user.id}` });
});


router.post("/reservas", (req, res) => {
  console.log("Solicitud POST recibida en /api/auth/reservas");
  res.status(200).send("Ruta funcionando correctamente");
});


// Rutas para las reservas


export default router;
