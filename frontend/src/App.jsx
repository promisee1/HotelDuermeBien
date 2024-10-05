import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/mensajes', { contenido: mensaje });
      console.log('Mensaje insertado:', response.data);
      setMensaje(''); // Limpiar el campo después de insertar
    } catch (error) {
      console.error('Error al insertar el mensaje:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Mensaje:
        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default App;