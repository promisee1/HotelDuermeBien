import React, { useState } from "react";
import "./login.css";


function Login({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Error de login");
        return;
      }
      if (response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login existoso");
        alert("Login existoso");
        return;
      }

      const data = await response.json();
      console.log("Login exitoso:", data.user);
    } catch (error) {
      console.error("Error en la petición:", error);
      setError("Error de servidor");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">

      

      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
      {error} <div className="alert alert-danger">{error}</div>
        <form
        
          onSubmit={handleSubmit}
          className="p-4 shadow rounded custom-form"
        >
          <h4 className="text-center mb-4">Iniciar Sesión</h4>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Correo del usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEmail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputContraseña" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="inputContraseña"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input custom-checkbox"
              id="RecordarCheck"
            />
            <label className="form-check-label" htmlFor="RecordarCheck">
              Recordar Contraseña
            </label>
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-4">
            Iniciar Sesión
          </button>
          <a href="#" className="forgot-password">
            Olvido su contraseña?
          </a>
        <div className="mt-3 text-center">
          <button className="btn btn-link" onClick={onRegister}>
            ¿No tienes una cuenta? Regístrate
          </button>
        </div>
        </form>
        {/* Botón de registro */}
      </div>
    </div>
  );
}

export default Login;
