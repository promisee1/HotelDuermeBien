import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './topbar.css';

const TopBarDropdown = ({ onLogout, toggleSidebar }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  // Función para actualizar el nombre de usuario desde localStorage
  const updateUserName = () => {
    const storedUserName = localStorage.getItem('nombre_usuario');
    setUserName(storedUserName || 'Usuario');
  };

  // useEffect para obtener el nombre del usuario al cargar el componente
  useEffect(() => {
    updateUserName();

    // Event listener para actualizar el nombre de usuario cuando cambie en localStorage
    const handleStorageChange = (event) => {
      if (event.key === 'nombre_usuario') {
        updateUserName();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpieza del event listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleProfile = () => {
    navigate("/admin/profile");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light topbar mb-4 static-top shadow">
      <button
        className="btn btn-link d-lg-none rounded-circle mr-3"
        onClick={toggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <span className="d-none d-lg-inline text-gray-600 mr-3 small">
                {userName}
              </span>
              <i className="fas fa-user fa-sm fa-fw"></i>
            </a>
            <ul className="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
              <li>
                <button className="dropdown-item" onClick={handleProfile}>
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Perfil
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default TopBarDropdown;
