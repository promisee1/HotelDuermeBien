import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTableExtensions from "react-data-table-component-extensions"; // Importar DataTableExtensions
import DataTable from "react-data-table-component";
import "react-data-table-component-extensions/dist/index.css"; // Estilos de las extensiones
import Modal from "react-modal";
import useBackground from "../assets/useBackground.jsx";
import "./admin.css";
import Sidebar from "../components/Sidebar.jsx";
import TopBar from "../components/TopBar.jsx";

Modal.setAppElement("#root");

const GestionUsuarios = () => {
  const navigate = useNavigate();
  useBackground("/src/assets/homeAdmin.webp");
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("Recepcionista");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/usuarios"
        );
        setUsuarios(response.data);
        toast.success("Lista de usuarios actualizada");
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        toast.error("Error al obtener la lista de usuarios");
      }
    };
    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/usuarios/${id}`);
      setUsuarios(usuarios.filter((usuario) => usuario.id_usuario !== id));
      toast.success("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      toast.error("Error al eliminar el usuario");
    }
  };

  const handleDelete = (id) => {
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

  const handleAdd = () => {
    setIsModalOpen2(true);
  };

  const editarUsuario = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/auth/usuarios/${selectedUsuario.id_usuario}`,
        {
          nombre_usuario: selectedUsuario.nombre_usuario,
          email: selectedUsuario.email,
          rol: selectedUsuario.rol,
        }
      );

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
    navigate("/login");
  };

  // Función para generar una contraseña automática con al menos una letra, un número y un carácter especial
  const generarContrasena = () => {
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const especiales = "!#$%&*.";

    const getRandomChar = (chars) =>
      chars[Math.floor(Math.random() * chars.length)];

    let contrasenaGenerada = "";
    contrasenaGenerada += getRandomChar(letras); // Al menos una letra
    contrasenaGenerada += getRandomChar(numeros); // Al menos un número
    contrasenaGenerada += getRandomChar(especiales); // Al menos un carácter especial

    // Generar los caracteres restantes aleatoriamente (mínimo de 8 caracteres en total)
    const allChars = letras + numeros + especiales;
    for (let i = 0; i < 5; i++) {
      contrasenaGenerada += getRandomChar(allChars);
    }

    return contrasenaGenerada
      .split("")
      .sort(() => 0.5 - Math.random())
      .join(""); // Mezclar los caracteres
  };

  // Generar una contraseña al cargar el componente
  useEffect(() => {
    setContrasena(generarContrasena());
  }, []); // Se ejecuta solo al montar el componente

  // Función de validación
  const validaciones = () => {
    let isValid = true;

    if (nombre === "" || email === "") {
      toast.error("Todos los campos son obligatorios");
      isValid = false;
    }

    if (contrasena.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Correo inválido");
      isValid = false;
    }

    if (rol === "") {
      toast.error("Selecciona un rol");
      isValid = false;
    }

    return isValid;
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!validaciones()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          nombre_usuario: nombre,
          email,
          contrasena,
          rol,
        }
      );
      console.log("Usuario añadido:", response.data);

      toast.success("Usuario añadido");
      setIsModalOpen2(false);
    } catch (error) {
      console.error("Error al añadir usuario:", error);
      toast.error("Error al añadir usuario");
    }
  };

  // Columnas para la tabla
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id_usuario,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.nombre_usuario,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
    },
    {
      name: "Contraseña",
      selector: (row) => row.contrasena,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <button className="btn btn-success btn-sm me-2" onClick={handleAdd}>
            <i className="bi bi-plus"></i>
          </button>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(row)}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.id_usuario)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const tableData = {
    columns,
    data: usuarios,
    print: false,
    download: false,
    export: false,
  };

  return (
    <div className="d-flex flex-column flex-lg-row">
      {/* TopBar colocada arriba */}
      <Sidebar onLogout={handleLogout} />

      <div className="flex-grow-1 me-1 ">
        {/* Sidebar en la izquierda */}
        <TopBar onLogout={handleLogout} />

        {/* Contenido principal */}
        <div className="container containerr mx-auto">
          <br />
          <h2 className="mb-4 mx-auto text-center font-weight-bold">Lista de Usuarios</h2>

          {/* Implementación de DataTable con barra de búsqueda */}
          <DataTableExtensions {...tableData}>
            <DataTable
              columns={columns}
              data={usuarios}
              pagination
              search
              highlightOnHover
              noDataComponent={
                <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#fff', borderRadius: '5px' }}>
                  No se encontraron usuarios que coincidan
                </div>
              }
          

            />
          </DataTableExtensions>

          {/* Modales para edición y adición de usuario (como en tu código original) */}
          {/* Modal para editar usuario */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={{
              content: {
                top: "80px",
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
                top: "15px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
                border: "solid red",
                backgroundColor: "red",
                color: "white",
                borderRadius: "40%",
                padding: "5px 10px",
                fontWeight: "bold",
                marginTop: "-5px",

                "&:hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }}
            >
              &times;
            </button>
            <div className="container containerr mt-5">
              <h2 className="text-center text-white-900 font-weight-bold">
                Editar Usuario
              </h2>
              <form>
                <div className="form-group text-white-900 font-weight-bold">
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
                <div className="form-group text-white-900 font-weight-bold">
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
                <div className="form-group text-white-900 font-weight-bold">
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
            </div>
          </Modal>

          <Modal
            isOpen={isModalOpen2}
            style={{
              content: {
                top: "80px",
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
              onClick={() => setIsModalOpen2(false)}
              style={{
                position: "absolute",
                top: "15px",
                right: "10px",
                background: "transparent",
                border: "none",
                fontSize: "15px",
                cursor: "pointer",
                border: "solid red",
                backgroundColor: "red",
                color: "white",
                borderRadius: "40%",
                padding: "5px 10px",
                fontWeight: "bold",
                marginTop: "-5px",

                "&:hover": {
                  backgroundColor: "red",
                  color: "white",
                },
              }}
            >
              &times;
            </button>

            <div className="container mt-5 containerr">
              <div className="form-wrapper">
                <h2 className="text-center text-white-900 font-weight-bold">
                  Añadir Usuario
                </h2>
                <form onSubmit={handleAddUser} className="form">
                  <div className="mb-3 form-group text-white-900 font-weight-bold">
                    <label className="form-label text-white-900 font-weight-bold">
                      Nombre:
                    </label>
                    <input
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 text-white-900 font-weight-bold form-group">
                    <label className="form-label">Correo:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 form-group">
                    <label className="form-label text-white-900 font-weight-bold">
                      Contraseña (Generada automáticamente):
                    </label>
                    <input
                      type="text"
                      value={contrasena}
                      className="form-control text-white-900 font-weight-bold "
                    />
                  </div>
                  <div className="mb-3 text-white-900 font-weight-bold form-group">
                    <label className="form-label">Rol:</label>
                    <select
                      value={rol}
                      onChange={(e) => setRol(e.target.value)}
                      className="form-select form-control"
                    >
                      <option value="Recepcionista">Recepcionista</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success ms text-white-900 font-weight-bold"
                  >
                    Registrar usuario
                  </button>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default GestionUsuarios;
