import { Router } from 'express';
import { register, login, eliminarUsuario, updateUsuario } from '../controllers/authControllers.js';
import { verifyToken } from '../controllers/authMiddleware.js';  // Importar el middleware de autenticación
import { getAllUsuarios } from '../controllers/authControllers.js';

const router = Router();

// Ruta de registro de usuarios (pública)
router.post('/register', register);

// Ruta de inicio de sesión (pública)
router.post('/login', login);

router.get('/usuarios', getAllUsuarios);

router.delete('/usuarios/:id', eliminarUsuario);

router.put('/usuarios/:id', updateUsuario);

// Rutas protegidas (ejemplo de ruta protegida)
router.get('/perfil', verifyToken, (req, res) => {
  // Solo se puede acceder si el token es válido
  res.json({ message: `Bienvenido usuario con ID: ${req.user.id}` });
});

export default router;
