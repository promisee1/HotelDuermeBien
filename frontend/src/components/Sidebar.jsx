import React from "react";
import Logo1 from "../assets/Logo1.jpeg";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <ul
      className="navbar-nav App sidebar sidebar-dark accordion px-1"
      id="accordionSidebar"
    >


      {/* Sidebar - Brand */}
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/"
      >
        <div className="sidebar-brand-icon mx-auto mb-5 mt-3">
          <img src={Logo1} alt="Logo" width={"100%"} height={"100%"} className="img-fluid mx-auto mt-5" />
        </div>
        <h5 className="sidebar-brand-text mx-auto mt-3 font-weight-bold">Hotel Duerme Bien</h5>

      </a>

      <hr className="sidebar-divider my-4" />

      {/* Opciones del sidebar */}
      <li className="nav-item">
        <Link className="nav-link" to="/admin">
          <i className="fas fa-cogs"></i>
          <span>Dashboard</span>
        </Link>
      </li>

      <li className="nav-item mt-1">
        <Link className="nav-link" to="/admin/users">
          <i className="fas fa-users-cog"></i>
          <span>Gestionar Usuarios</span>
        </Link>
      </li>
      
      <li className="nav-item">
        <Link className="nav-link" to="/admin/profile">
          <i className="fas fa-cogs"></i>
          <span>Mi perfil</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" onClick={() => handleLogout()}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar Sesión</span>
        </Link>
      </li>
    </ul>
  );
};

export default Sidebar;
