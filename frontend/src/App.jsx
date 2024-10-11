import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login/login";
import Register from "./login/registrar";
import HomeAdmin from "./Admin/HomeAdmin";
import HomeRecepcionista from "./Recepcionista/HomeRecepcionista";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Esta función se encarga de manejar el éxito del login y asignar el rol del usuario
  const handleLoginSuccess = (response) => {
    if (response && response.success && response.user) {
      const { user } = response;  // Extraemos el usuario de la respuesta
      if (user.rol) {
        console.log("Autenticación exitosa:", user);
        console.log("Autenticación exitosa como", user.rol);  // Mostramos el rol para verificar
        setIsAuthenticated(true);
        setUserRole(user.rol);  // Asignamos el rol correctamente
      } else {
        console.error("Error: El usuario no tiene un rol definido.");
      }
    } else {
      console.error("Error: No se pudo obtener el rol del usuario o la autenticación falló.");
    }
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
  };

  // Este useEffect se asegura de que las redirecciones solo ocurren una vez cuando cambia la autenticación o el rol
  useEffect(() => {
    if (isAuthenticated && userRole) {
      console.log(`Autenticación exitosa como ${userRole}`);
    }
  }, [isAuthenticated, userRole]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                userRole === "Administrador" ? (
                  <Navigate to="/admin" replace />  // Reemplaza la navegación para evitar un loop
                ) : (
                  <Navigate to="/recepcionista" replace />  // Asegura que la navegación solo ocurre una vez
                )
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />  // Pasa la función de éxito al login
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              isAuthenticated && userRole === "Administrador" ? (
                <HomeAdmin onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/recepcionista"
            element={
              isAuthenticated && userRole === "Recepcionista" ? (
                <HomeRecepcionista onLogout={handleLogout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;