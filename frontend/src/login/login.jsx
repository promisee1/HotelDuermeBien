import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Logo from "../assets/logodb.png"; 
import "./login.css"; 
import bglogin from "../assets/bglogin.png";

function Login({ onLoginSuccess }) {

  useBackground("/src/assets/Login.jpg")
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, contrasena }
      );

      const data = response.data;

      if (data.success) {
        console.log("Autenticación exitosa:", data);
        onLoginSuccess(data); // Enviar `data` completo
        toast.success("Autenticación exitosa");
      } else {
        setError(data.message || "Error de autenticación");
        toast.error("Error de autenticación");
      }
    } catch (error) {
      console.error("Error en la petición:", error.response?.data || error.message);
      setError("Error de servidor o de conexión");
      toast.error("Error de servidor o de conexión");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="p-4 shadow rounded custom-form">
          
          <img 
            src={Logo} 
            className="logo d-block mx-auto my-4" 
            alt="Logo"
          />

          <h4 className="text-center mb-4">Iniciar Sesión</h4>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Correo del usuario
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
          <button type="submit" className="btn btn-dark w-100 mb-4">
            Iniciar Sesión
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
