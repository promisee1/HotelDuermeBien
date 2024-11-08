import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './topbar.css';

const TopBarDropdown = ({ onLogout }) => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  // Obtener la información del usuario desde localStorage cuando se monta el componente
  useEffect(() => {
    const storedUserName = localStorage.getItem('nombre_usuario');
    
    // Si el nombre del usuario está almacenado, lo asignamos al estado
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Función para manejar la acción de "Cerrar sesión"
  const handleLogout = () => {
    // Limpiar la información de localStorage al cerrar sesión
    localStorage.removeItem('nombre_usuario');
    onLogout();
    navigate("/login");
  };

  // Función para manejar la acción de ir al perfil
  const handleProfile = () => {
    navigate("/admin/profile");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light topbar mb-4 static-top shadow z-index-1">
      <ul className="navbar-nav ml-auto">
        <div className="topbar-divider d-none d-sm-block"></div>

        {/* Dropdown para el usuario */}
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            {/* Mostrar el nombre del usuario */}
            <span className="d-none d-lg-inline text-gray-600 mr-3 small">
              {userName || 'Usuario'}
            </span>
            <i className="fas fa-user fa-sm fa-fw"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
            {/* Opción de Perfil */}
            <li>
              <button className="dropdown-item" onClick={handleProfile}>
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Perfil
              </button>
            </li>
            {/* Divider */}
            <li><hr className="dropdown-divider" /></li>
            {/* Opción de Cerrar Sesión */}
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default TopBarDropdown;
