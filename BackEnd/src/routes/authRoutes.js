import { Router } from 'express';

// Importes de autenticación
import { login } from '../controllers/authControllers.js';

// Importes de usuarios
import {register, eliminarUsuario, updateUsuario, getAllUsuarios } from '../controllers/authControllers.js';


//Importes de habitaciones
import { crearHabitacion, obtenerHabitaciones, eliminarHabitacion, actualizarHabitacion } from '../controllers/authControllers.js';

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

// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/perfil', (req, res) => {
  res.json({ message: `Bienvenido usuario con ID: ${req.user.id}` });
});

export default router;
