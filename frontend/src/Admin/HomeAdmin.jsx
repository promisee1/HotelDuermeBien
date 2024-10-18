import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header.jsx"; // Importar el Header
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Busqueda from './Busqueda'; // Importar el componente de búsqueda
import Modal from "react-modal"; 
import useBackground from "../assets/useBackground.jsx";
import './admin.css'; 

Modal.setAppElement("#root");

const HomeAdmin = ({ onLogout }) => {
  const navigate = useNavigate();
  useBackground('/src/assets/homeAdmin.webp');
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]); // Añadir estado para usuarios filtrados
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Usuario seleccionado para editar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const loggedUserId = localStorage.getItem('loggedUserId'); // Obtener el ID del usuario logueado desde el localStorage

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/usuarios");
        setUsuarios(response.data);
        setUsuariosFiltrados(response.data); // Inicializar los usuarios filtrados con todos los usuarios
        toast.success("Lista de usuarios actualizada");
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        toast.error("Error al obtener la lista de usuarios");
      }
    };
    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    if (id.toString() === loggedUserId) {
      toast.error("No puedes eliminarte a ti mismo");
      return;
    }
    
    try {
      await axios.delete(`http://localhost:5000/api/auth/usuarios/${id}`); // Asegúrate de que la ruta sea correcta
      setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));
      setUsuariosFiltrados(
        usuariosFiltrados.filter((usuario) => usuario.id_usuario !== id)
      );
      toast.success("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      toast.error("Error al eliminar el usuario");
    }
  };

  const handleDelete = (id) => {
    if (id.toString() === loggedUserId) {
      toast.error("No puedes eliminarte a ti mismo");
      return;
    }

    toast(
      ({ closeToast }) => (
        <div>
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
          <button
            className="btn btn-danger me-2"
            onClick={() => {
              eliminarUsuario(id);
              closeToast();
            }}
          >
            Confirmar
          </button>
          <button className="btn btn-secondary" onClick={closeToast}>
            Cancelar
          </button>
        </div>
      ),
      { autoClose: false }
    );
  };

  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario);
    setIsModalOpen(true);
  };

  const editarUsuario = async () => {
    try {
      await axios.put(`http://localhost:5000/api/auth/usuarios/${selectedUsuario.id_usuario}`, {
        nombre_usuario: selectedUsuario.nombre_usuario,
        email: selectedUsuario.email,
        rol: selectedUsuario.rol,
      });

      setUsuarios(
        usuarios.map((usuario) =>
          usuario.id_usuario === selectedUsuario.id_usuario
            ? { ...usuario, ...selectedUsuario }
            : usuario
        )
      );
      toast.success("Usuario actualizado con éxito");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      toast.error("Error al editar el usuario");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUsuario({ ...selectedUsuario, [name]: value });
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <Header onLogout={handleLogout}/>
      <br></br><br />
      <h2 className="mb-4">Lista de Usuarios</h2>

      {/* Añadir componente de búsqueda */}
      <Busqueda usuarios={usuarios} setUsuariosFiltrados={setUsuariosFiltrados} />
      <table className=" mt-3 table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Contraseña</th>
            <th>Acciones</th> {/* Columna para las acciones */}
          </tr>
        </thead>
        <tbody>
          {/* Usar usuarios filtrados en lugar de todos los usuarios */}
          {usuariosFiltrados.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td>{usuario.id_usuario}</td>
              <td>{usuario.nombre_usuario}</td>
              <td>{usuario.email}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.contrasena}</td>
              <td>
                {/* Íconos de edición y eliminación */}
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(usuario)}
                >
                  <i className="bi bi-pencil-square"></i>{" "}
                  {/* Icono de editar */}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(usuario.id_usuario)}
                >
                  <i className="bi bi-trash"></i> {/* Icono de eliminar */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar usuario */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          content: {
            top: "150px",
            left: "50%",
            width: "70vw",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -0%)",
          },
        }}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            position: "absolute",
            top: "30px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <h2 className="text-center">Editar Usuario</h2>
        <form>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre_usuario"
              className="form-control"
              value={selectedUsuario?.nombre_usuario || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={selectedUsuario?.email || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="rol">Rol</label>
            <select
              id="rol"
              name="rol"
              className="form-control"
              value={selectedUsuario?.rol || ""}
              onChange={handleInputChange}
            >
              <option value="Recepcionista">Recepcionista</option>
              <option value="Administrador">Administrador</option>
            </select>
          </div>
          <button
            type="button"
            className="btn btn-success mt-3"
            onClick={editarUsuario}
          >
            Guardar cambios
          </button>
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default HomeAdmin;
