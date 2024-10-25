import React from 'react';
import { useNavigate } from 'react-router-dom';
import './topbar.css';

const TopBarDropdown = ({ onLogout }) => {

    const navigate = useNavigate();

    // Función para manejar la acción de "Cerrar sesión"
    const handleLogout = () => {
        onLogout();
        navigate("/login");
    }

    // Función para manejar la acción de ir al perfil
    const handleProfile = () => {
        navigate("/admin/profile");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light topbar mb-4 static-top shadow">
            
            <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                {/* Dropdown para el usuario */}
                <li className="nav-item dropdown ">
                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        {/* En pantallas pequeñas, solo mostrar el icono */}
                        <span className="d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
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
