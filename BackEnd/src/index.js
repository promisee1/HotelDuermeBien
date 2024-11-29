import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/authRoutes.js';

// Configuración de CORS para permitir solicitudes desde tu frontend

// Variable de entorno express
const app = express();
// Variable de puerto predeterminado para el servidor 
const PORT = 5000;

// Configuración de CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto según tu URL del frontend
  credentials: true, // Si estás usando cookies o credenciales
}));

// App usará el bodyparser para transformar los datos en archivos entendibles para el ORM
app.use(bodyParser.json());

// Rutas de autenticación
app.use('/api/auth', router);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
