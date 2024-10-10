import express from 'express';
import bodyParser from 'body-parser';
import { query as dbQuery } from './config/db.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para insertar un mensaje en la base de datos
app.post('/api/mensajes', async (req, res) => {
  const { contenido } = req.body;
  try {
    const result = await dbQuery('INSERT INTO mensajes (contenido) VALUES (?)', [contenido]);
    res.status(201).json(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al insertar el mensaje' });
  }
});

// Nueva ruta para verificar el login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;  // Datos recibidos desde el frontend

  try {
    // Consulta segura utilizando parámetros
    const result = await dbQuery('SELECT * FROM usuarios WHERE email = ? AND contrasena = ?', [email, password]);
    
    if (result.length > 0) {
      // Si el usuario existe, retorna los datos del usuario (puedes filtrar qué datos enviar al frontend)
      res.status(200).json({ message: 'Login exitoso', user: result[0] });
    } else {
      // Si el usuario no existe o las credenciales son incorrectas
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en la consulta:', err);
    res.status(500).json({ error: 'Error al verificar las credenciales' });
  }
});


// Nueva ruta para registrar usuarios
app.post('/api/register', async (req, res) => {
  const { nombre_usuario, email, password, rol } = req.body;

  try {
    // Inserta los datos en la tabla de usuarios
    const result = await dbQuery('INSERT INTO usuarios (nombre_usuario, email, contrasena, rol) VALUES (?, ?, ?, ?)', [nombre_usuario, email, password, rol]);
    
    res.status(201).json({ message: 'Registro exitoso', userId: result.insertId });
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});




app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});