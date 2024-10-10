// src/components/Register.js
import React, { useState } from 'react';

function Register({ onBackToLogin }) {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_usuario, email, password, rol }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error en el registro');
        return;
      }

      const data = await response.json();
      console.log('Registro exitoso:', data.user);
      onBackToLogin(); // Navegar de vuelta al login después de registrarse
    } catch (error) {
      console.error('Error en la petición:', error);
      setError('Error de servidor');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '25rem' }}>
        <h3 className="card-title text-center">Regístrate</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3">
            <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
            <input
              type="text"
              className="form-control"
              id="nombre_usuario"
              placeholder="Tu nombre de usuario"
              value={nombre_usuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="rol">Rol:</label>
            <input
              type="text"
              className="form-control"
              id="rol"
              placeholder="Tu rol (ej: admin, usuario)"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
        <div className="mt-3">
          <button className="btn btn-link" onClick={onBackToLogin}>¿Ya tienes cuenta? Inicia sesión</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
