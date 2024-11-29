import React, { useState } from "react";
import Logo1 from "../assets/Logo1.jpeg";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Manejar el cierre de sesión
  const handleLogout = () => {
    onLogout();
    window.location.href = "http://localhost:5173"; // Redirigir a la raíz sin /login
  };

  // Abrir modal
  const handleShowModal = () => {
    setShowLogoutModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <ul
        className="navbar-nav App sidebar sidebar-dark accordion px-1 position-fixed z-2"
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
          <Link className="nav-link" to="/recepcionista">
            <i className="fas fa-cogs"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item mt-1">
          <Link className="nav-link" to="/recepcionista/habitaciones">
            <i className="fas fa-users-cog"></i>
            <span>Gestionar Habitaciones</span>
          </Link>
        </li>

        <li className="nav-item mt-1">
          <Link className="nav-link" to="/recepcionista/huespedes">
            <i className="fas fa-users-cog"></i>
            <span>Gestionar Huespedes</span>
          </Link>
        </li>

        <li className="nav-item mt-1">
          <Link className="nav-link" to="/recepcionista/reservas">
            <i className="fas fa-users-cog"></i>
            <span>Gestionar Reservas</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" onClick={handleShowModal}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </Link>
        </li>
      </ul>

      {/* Modal de Confirmación */}
      <Modal show={showLogoutModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas cerrar sesión?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Sidebar;
