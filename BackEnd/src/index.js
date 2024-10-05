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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});