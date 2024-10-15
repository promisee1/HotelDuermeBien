import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate para realizar la redirección
import Toastify from "toastify";
import Header from './header';


const AdminAddUser = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('Recepcionista');
  
  const navigate = useNavigate();  // Inicializar useNavigate

  // Función para manejar el envío del formulario
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        nombre_usuario: nombre,
        email,
        contrasena,
        rol,
      });
      console.log('Usuario añadido:', response.data);

      Toastify.success('Usuario anadido');
      // Redirigir al home del administrador después de añadir el usuario exitosamente
      setTimeout(() => navigate('/admin'), 3500);  // Redirige a la página principal del administrador con un pequeño delay
    } catch (error) {
      console.error('Error al añadir usuario:', error);
      Toastify.error('Error al añadir usuario');
    }
  };

  return (
    <div className="container mt-5">
      <Header/>
      <br /><br />
      <h2>Añadir Usuario</h2>
      <form onSubmit={handleAddUser}>
        <div className="mb-3">
          <label>Nombre:</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Contraseña:</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Rol:</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)} className="form-select">
            <option value="Recepcionista">Recepcionista</option>
            <option value="Administrador">Administrador</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Añadir Usuario</button>
      </form>
    </div>
  );
};

export default AdminAddUser;
