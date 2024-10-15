import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/logo.png';
import './header.css';

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={Logo} alt="Logo" width="100" height="50" className='ms-3 align-top'/>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

               <Link className="nav-link" to="/admin/">
                  Lista de usuarios
                </Link>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/add-user">
                  Añadir Usuario
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/profile">
                  Ver Perfil
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
