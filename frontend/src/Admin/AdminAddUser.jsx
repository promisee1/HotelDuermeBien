import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from './header'; 
import './admin.css'; 
import useBackground from '../assets/useBackground';

const AdminAddUser = () => {
  useBackground('/src/assets/homeAdmin.webp');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('Recepcionista');
  
  const navigate = useNavigate();

  // Función para generar una contraseña automática con al menos una letra, un número y un carácter especial
  const generarContrasena = () => {
    const letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    const especiales = '!#$%&*.';

    const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];

    let contrasenaGenerada = '';
    contrasenaGenerada += getRandomChar(letras); // Al menos una letra
    contrasenaGenerada += getRandomChar(numeros); // Al menos un número
    contrasenaGenerada += getRandomChar(especiales); // Al menos un carácter especial

    // Generar los caracteres restantes aleatoriamente (mínimo de 8 caracteres en total)
    const allChars = letras + numeros + especiales;
    for (let i = 0; i < 5; i++) {
      contrasenaGenerada += getRandomChar(allChars);
    }

    return contrasenaGenerada.split('').sort(() => 0.5 - Math.random()).join(''); // Mezclar los caracteres
  };

  // Generar una contraseña al cargar el componente
  useEffect(() => {
    setContrasena(generarContrasena());
  }, []); // Se ejecuta solo al montar el componente

  // Función de validación
  const validaciones = () => {
    let isValid = true;

    if (nombre === '' || email === '') {
      toast.error('Todos los campos son obligatorios');
      isValid = false;
    }

    if (contrasena.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Correo inválido');
      isValid = false;
    }

    if (rol === '') {
      toast.error('Selecciona un rol');
      isValid = false;
    }

    return isValid;
  };

  // Función para manejar el envío del formulario
  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!validaciones()) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        nombre_usuario: nombre,
        email,
        contrasena,
        rol,
      });
      console.log('Usuario añadido:', response.data);

      toast.success('Usuario añadido');
      setTimeout(() => navigate('/admin'), 1500);
    } catch (error) {
      console.error('Error al añadir usuario:', error);
      toast.error('Error al añadir usuario');
    }
  };

  return (
    <div className="container mt-5">
      <Header/>
      <br /><br />
      <div className="form-wrapper">
        <h2 className="text-center">Añadir Usuario</h2>
        <form onSubmit={handleAddUser} className="form">
          <div className="mb-3">
            <label className="form-label">Nombre:</label>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="form-control input-custom"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control input-custom"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña (Generada automáticamente):</label>
            <input
              type="text"
              value={contrasena}
              readOnly
              className="form-control input-custom"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rol:</label>
            <select 
              value={rol} 
              onChange={(e) => setRol(e.target.value)} 
              className="form-select input-custom"
            >
              <option value="Recepcionista">Recepcionista</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <button type="submit" className="btn btn-custom btn-block">Enviar</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminAddUser;
