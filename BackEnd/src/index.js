import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/authRoutes.js';

// Configuración de CORS para permitir solicitudes desde tu frontend

const app = express();
const PORT = 5000;

// Configuración de CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:5173',  // Permitir solicitudes solo desde el frontend
  credentials: false,  // Permitir envío de credenciales (como cookies o sesiones)
}));

app.use(bodyParser.json());

// Rutas de autenticación
app.use('/api/auth', router);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
