
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import useBackground from "../assets/useBackground.jsx";
import "./admin.css";
import Sidebar from "../components/Sidebar.jsx";
import TopBar from "../components/TopBar.jsx";
import useCss from "../assets/useCss.jsx";

Modal.setAppElement("#root");

const GestionUsuarios = () => {
  useCss();
  const navigate = useNavigate();
  useBackground("/src/assets/homeAdmin.webp");
  const [usuarios, setUsuarios] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [pending, setPending] = useState(true);
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("Recepcionista");

  const [isOpen, setIsOpen] = useState(window.innerWidth > 992);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Eliminar usuario
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

  // Editar usuario
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

  // Generar contraseña automática
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

  useEffect(() => {
    setContrasena(generarContrasena());
  }, []);

  // Validación
  const validaciones = () => {
    let isValid = true;

    if (nombre === "" || email === "") {
      toast.error("Todos los campos son obligatorios");
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

  // Añadir usuario
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

  // Fetch de usuarios (solo se llama una vez)
  const fetchUsuarios = async () => {
    try {
      setPending(true);
      const response = await axios.get("http://localhost:5000/api/auth/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      toast.error("Error al obtener la lista de usuarios");
    } finally {
      setPending(false);
    }
  };

  // Efecto para cargar usuarios y filtrar
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Filtrado
  const filteredUsuarios = usuarios.filter(user => {
    return (
      user.nombre_usuario?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.rol?.toLowerCase().includes(filterText.toLowerCase())
    );
  });

  const columns = [
    {
      name: "Nombre",
      selector: row => row.nombre_usuario,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "Rol",
      selector: row => row.rol,
      sortable: true,
    },
    {
      name: "Contrasena",
      selector: row => row.contrasena,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: row => (
        <div className="d-flex justify-content-center text-center">
          <button
            onClick={() => handleEdit(row)}
            className="btn btn-warning me-2"
          >
            <i className="bi bi-pencil-square"></i>
          </button>

          <button
            onClick={() => handleDelete(row.id_usuario)}
            className="btn btn-danger"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#f8f9fa",
        fontWeight: "bold",
      },
    },
    cells: {
      style: {
        paddingLeft: "50px",
        paddingRight: "50px",
      },
    },
  };

  const SubHeaderComponent = () => {
    return (
      <input
        type="text"
        className="form-control me-2"
        placeholder="Buscar usuarios..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ width: "100%" }}
      />
    );
  };
  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} onLogout={handleLogout} />
  
      <div className={`flex-grow-1 ${isOpen ? 'content-shift' : ''}`}>
        <TopBar onLogout={handleLogout} toggleSidebar={toggleSidebar} />
  
        <div className="container containerr mx-auto ">
          <br />
          <div className="card">
            <div className="card-body text-end mb-4">
              <div className="mb-4">
                <h2 className="font-weight-bold text-center">Lista de Usuarios</h2>
              </div>
              <div className="d-flex justify-content-center mb-2">
                <SubHeaderComponent />
                <button
                  className="btn btn-primary w-50 mb-2"
                  onClick={handleAdd}
                >
                  Añadir Usuario
                </button>
              </div>
              <DataTable
                columns={columns} // Define las columnas de la tabla
                data={filteredUsuarios} // Define los datos de la tabla
                pagination // Habilita la paginación
                paginationPerPage={10} // Define la cantidad de registros por página
                paginationRowsPerPageOptions={[10, 20, 30]} // Define las opciones de registros por página
                customStyles={customStyles} // Estilos personalizados
                progressPending={pending} // Indica si hay datos pendientes
                striped // Pone las filas de la tabla de color
                highlightOnHover // Pone el cursor sobre las filas
                pointerOnHover // Pone el cursor sobre las filas
  
                noDataComponent={
                  <div className="p-4 text-center">
                    No se encontraron usuarios que coincidan con la búsqueda.
                  </div>
                }
              />
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            style={{
              content: {
                top: "50px",
                left: "50%",
                width: "90vw",
                right: "auto",
                bottom: "auto",
                padding: "20px",
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
                fontSize: "15px",
                cursor: "pointer",
                border: "solid red",
                backgroundColor: "red",
                color: "white",
                borderRadius: "40%",
                padding: "5px 10px",
                fontWeight: "bold",
                marginTop: "-5px",
              }}
            >
              &times;
            </button>
            <div className="container containerr mt-5 scroll w-100">
              <form className="w-100">
                <h2 className="text-center text-white font-weight-bold">
                  Editar Usuario
                </h2>
                <div className="form-group text-white font-weight-bold">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre_usuario"
                    className="form-control text-black font-weight-bold"
                    value={selectedUsuario?.nombre_usuario || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group text-white font-weight-bold">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control text-black font-weight-bold"
                    value={selectedUsuario?.email || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group text-white font-weight-bold">
                  <label htmlFor="rol">Rol</label>
                  <select
                    id="rol"
                    name="rol"
                    className="form-control text-black font-weight-bold"
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
                top: "60px",
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
                fontSize: "15px",
                cursor: "pointer",
                border: "solid red",
                backgroundColor: "red",
                color: "white",
                borderRadius: "40%",
                padding: "5px 10px",
                fontWeight: "bold",
                marginTop: "-5px",
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
                      className="form-control text-white-900 font-weight-bold"
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
  )}


export default GestionUsuarios;