import { Router } from 'express';
import { register, login, eliminarUsuario, updateUsuario } from '../controllers/authControllers.js';
import { getAllUsuarios } from '../controllers/authControllers.js';

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

// Ruta protegida para obtener el perfil del usuario autenticado
router.get('/perfil', (req, res) => {
  res.json({ message: `Bienvenido usuario con ID: ${req.user.id}` });
});

export default router;
