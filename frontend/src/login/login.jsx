import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo1 from "../assets/Logo1.jpeg";
import useBackground from "../assets/useBackground";
import useCss from "../assets/useCss";
import './login.css';

function Login({ onLoginSuccess }) {
  useCss();
  useBackground("/src/assets/Login.jpg");
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
        onLoginSuccess(data);
        toast.success("Autenticación exitosa");
      } else {
        setError(data.message || "Error de autenticación");
        toast.error("Error de autenticación");
      }
    } catch (error) {
      console.error(
        "Error en la petición:",
        error.response?.data || error.message
      );
      setError("Error de servidor o de conexión");
      toast.error("Error de servidor o de conexión");
    }
  };

  return (
    <div className="container ">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row custom-form">
                {/* Columna para el formulario */}
                <div className="col-lg-12 my-5 ">
                  <div className="px-5">
                    <div className="text-center">
                      <img
                        src={Logo1}
                        alt="Hotel Duerme Bien"
                        className="img-fluid mb-4"
                        style={{ width: "20%" }}
                      />
                      <h1 className="h1 text-white font-weight-light font-weight-bold mb-4">Iniciar Sesión</h1>
                    </div>
                    <form className="user form" onSubmit={handleSubmit}>
                      <div className="form-group mb-3">
                        <input
                          type="email"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Correo electrónico"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Contraseña"
                          value={contrasena}
                          onChange={(e) => setContrasena(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-user btn-block "

                      >
                        Iniciar Sesión
                      </button>
                      <hr />
                    </form>
                    {error && (
                      <div className="alert alert-danger mt-3">{error}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
