import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Register() {
  const [nombre_usuario, setNombreUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("Recepcionista");  // O el rol que prefieras
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        nombre_usuario,
        email,
        contrasena,
        rol,
      });

      const data = response.data;
      if (data.message) {
        console.log("Registro exitoso");
        // Aquí puedes redirigir al login si el registro fue exitoso, usando una navegación programática
      } else {
        setError("Error al registrar");
      }
    } catch (error) {
      console.error("Error en la petición:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Error de servidor");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="p-4 shadow rounded custom-form">
          <h4 className="text-center mb-4">Regístrate</h4>
          <div className="mb-3">
            <label htmlFor="inputNombre" className="form-label">
              Nombre de usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="inputNombre"
              onChange={(e) => setNombreUsuario(e.target.value)}
              value={nombre_usuario}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputContraseña" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="inputContraseña"
              onChange={(e) => setContrasena(e.target.value)}
              value={contrasena}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectRol" className="form-label">Rol</label>
            <select
              className="form-select"
              id="selectRol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
            >
              <option value="Administrador">Administrador</option>
              <option value="Recepcionista">Recepcionista</option>
            </select>
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-4">Registrarse</button>
          <div className="mt-3 text-center">
            {/* Este botón redirige a la ruta de login */}
            <Link to="/">¿Ya tienes una cuenta? Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
