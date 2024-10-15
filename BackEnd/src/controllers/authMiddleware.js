import jwt from 'jsonwebtoken';


//Constante de verificacion de token que permitirá evitar que se pueda acceder a rutas sin tener los permisos
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];  // El token se enviará en los headers de la solicitud

  if (!token) {
    return res.status(403).json({ success: false, message: 'No se proporcionó un token' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, 'clave_secreta');  // Usa la misma clave que en `sign`

    // Si el token es válido, guarda los datos decodificados en req.user
    req.user = decoded;
    next();  // Pasamos al siguiente middleware o controlador
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token no válido o expirado' });
  }
};
