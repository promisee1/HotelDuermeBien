import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header.jsx"; // Importar el Header
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal"; // Asegúrate de tener instalado react-modal

Modal.setAppElement("#root"); // Esto es necesario para accesibilidad en modales

const HomeAdmin = ( { onLogout} ) => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null); // Usuario seleccionado para editar
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal

  // Obtener la lista de usuarios desde la API cuando el componente cargue
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/usuarios"
        ); // Cambia la ruta si es necesario
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        toast.error("Error al obtener la lista de usuarios");
      }
    };

    fetchUsuarios();
  }, []);

  // Función para eliminar un usuario de la API
  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/usuarios/${id}`); // Asegúrate de que la ruta sea correcta
      // Filtra el usuario eliminado de la lista de usuarios
      setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));

      // Mostrar mensaje de éxito
      toast.success("Usuario eliminado con éxito");

      
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      toast.error("Error al eliminar el usuario");
    }
  };

  // Función para manejar la eliminación de usuario con confirmación
  const handleDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>¿Estás seguro de que deseas eliminar este usuario?</p>
          <button
            className="btn btn-danger me-2"
            onClick={() => {
              eliminarUsuario(id); // Llama a la función de eliminación
              closeToast(); // Cierra el toast
            }}
          >
            Confirmar
          </button>
          <button className="btn btn-secondary" onClick={closeToast}>
            Cancelar
          </button>
        </div>
      ),
      { autoClose: false } // Para que no se cierre automáticamente hasta que el usuario elija
    );
  };

  // Función para manejar la edición de usuario
  const handleEdit = (usuario) => {
    setSelectedUsuario(usuario); // Guarda el usuario seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  // Función para guardar los cambios del usuario editado
  const editarUsuario = async () => {
    try {
      // Enviamos solo los datos que deben actualizarse
      await axios.put(`http://localhost:5000/api/auth/usuarios/${selectedUsuario.id_usuario}`, {
        nombre_usuario: selectedUsuario.nombre_usuario,
        email: selectedUsuario.email,
        rol: selectedUsuario.rol,
      });
  
      // Actualizamos la lista de usuarios localmente
      setUsuarios(
        usuarios.map((usuario) =>
          usuario.id_usuario === selectedUsuario.id_usuario
            ? { ...usuario, ...selectedUsuario } // Actualizamos solo los datos necesarios
            : usuario
        )
      );
  
      toast.success("Usuario actualizado con éxito");
      setIsModalOpen(false); // Cerramos el modal después de la edición
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      toast.error("Error al editar el usuario");
    }
  };
  
  

  // Manejar el cambio de los campos del formulario de edición
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
      {/* Mostrar el Header */}
      <h2 className="mb-4">Lista de Usuarios</h2>
      {/* Mostrar la tabla con los usuarios */}
      <table className="table table-striped table-bordered">
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
          {usuarios.map((usuario) => (
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
            top: "150px", // Ajusta el valor según la altura de tu header
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
          &times; {/* El carácter de "X" */}
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
      <ToastContainer /> {/* Componente para manejar las notificaciones */}
    </div>
  );
};

export default HomeAdmin;
