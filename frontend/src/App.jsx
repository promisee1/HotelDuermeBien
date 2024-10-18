import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import HomeAdmin from './Admin/HomeAdmin';
import AdminAddUser from './Admin/AdminAddUser';
import AdminProfile from './Admin/AdminProfile';
import HomeRecepcionista from './Recepcionista/HomeRecepcionista';
import Login from './login/login';
import './App.css';


function App() {
  

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  // Esta función maneja el éxito del login
  const handleLoginSuccess = (response) => {
    if (response && response.success && response.user) {
      const { user } = response;
      setIsAuthenticated(true);
      setUserRole(user.rol); // Establecemos el rol del usuario (Administrador o Recepcionista)
    }
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(''); // Reiniciamos el rol
  };

  // Se asegura de que si el usuario está autenticado y tiene un rol, ocurra una redirección una vez
  useEffect(() => {
    if (isAuthenticated && userRole) {
      console.log(`Autenticación exitosa como ${userRole}`);
    }
  }, [isAuthenticated, userRole]);

  return (
    <Router>
      <Routes>
        {/* Ruta para el Administrador */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated && userRole === 'Administrador' ? (
              <AdminRoutes onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta para el Recepcionista */}
        <Route
          path="/recepcionista"
          element={
            isAuthenticated && userRole === 'Recepcionista' ? (
              <HomeRecepcionista onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        {/* Ruta de login */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              userRole === 'Administrador' ? (
                <Navigate to="/admin" replace />
              ) : userRole === 'Recepcionista' ? (
                <Navigate to="/recepcionista" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

// Componente para manejar las rutas del administrador
function AdminRoutes({ onLogout }) {
  return (
    <Routes>
      <Route path="/" element={<HomeAdmin onLogout={onLogout} />} />
      <Route path="add-user" element={<AdminAddUser />} />
      <Route path="profile" element={<AdminProfile onLogout={onLogout} />} />
    </Routes>
  );
}

export default App;
