import jwt from 'jsonwebtoken';

// Middleware de verificación de token
export const verifyToken = (req, res, next) => {
  // Verificar que el token está presente en el header Authorization
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);  // Log para verificar si el header Authorization está presente

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Token no proporcionado o formato incorrecto');
    return res.status(403).json({ message: 'No se ha proporcionado un token o el formato es incorrecto' });
  }

  // Extraer el token sin el prefijo 'Bearer '
  const token = authHeader.split(' ')[1];
  console.log('Token recibido:', token);  // Log para verificar el token recibido

  // Verificar y decodificar el token
  try {
    const decoded = jwt.verify(token, 'tu_clave_secreta');  // Asegúrate de usar la clave secreta correcta
    console.log('Token decodificado:', decoded);  // Log para verificar los datos del token decodificado
    req.user = decoded;  // Almacenar el usuario decodificado en la solicitud
    next();  // Pasar al siguiente middleware o ruta si el token es válido
  } catch (error) {
    console.log('Error al verificar el token:', error);  // Log del error específico
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado, por favor inicia sesión nuevamente' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    } else {
      return res.status(500).json({ message: 'Error al procesar el token' });
    }
  }
};
