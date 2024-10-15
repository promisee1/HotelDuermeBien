import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';

const AdminProfile = () => {
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/usuarios/perfil');  // Ajusta esta ruta
        setPerfil(response.data);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Header/>
      <br /><br /><br />
      <br></br>
      <h2>Mi Perfil</h2>
      {perfil ? (
        <div>
          <p>Nombre: {perfil.nombre_usuario}</p>
          <p>Email: {perfil.email}</p>
          <p>Rol: {perfil.rol}</p>
        </div>
      ) : (
        <p>Cargando perfil...</p>
      )}
    </div>
  );
};

export default AdminProfile;
