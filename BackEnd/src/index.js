// backend/src/index.js
import express, { json } from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(json());

// Ruta básica
app.get('/', (req, res) => {
  res.send('Hola desde el backend con Express');
});

app.listen(port, () => {
  console.log(`Backend corriendo en http://localhost:${port}`);
});
