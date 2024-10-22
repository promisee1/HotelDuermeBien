import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useCss = () => {
  const location = useLocation(); // Obtener la ruta actual

  useEffect(() => {
    // Limpiar estilos cuando cambias de página
    document.body.className = ""; // Limpiar las clases del body

    // Aplicar diferentes estilos según la ruta
    switch (location.pathname) {
      case "/admin":
        document.body.style.backgroundColor = "#ffffff"; // Fondo blanco para admin
        document.body.classList.add("admin-page"); // Clase personalizada para admin
        break;
      case "/admin/profile":
        document.body.style.backgroundColor = "#e0e0e0"; // Fondo gris más oscuro para perfil
        document.body.classList.add("profile-page"); // Clase para la página de perfil
        break;
      case "/recepcionista":
        document.body.style.backgroundColor = "#ffffff"; // Fondo blanco para recepcionista
        document.body.classList.add("recepcionista-page");
        break;
      case "/":
        document.body.style.backgroundColor = "#333"; // Fondo oscuro para login
        document.body.style.color = "#fff"; // Texto blanco
        document.body.classList.add("login-page"); // Clase para la página de login
        break;
      default:
        document.body.style.backgroundColor = "#fff"; // Fondo blanco para otras páginas
        document.body.style.color = "#000"; // Texto negro
        break;
    }

    // Limpiar el efecto cuando el componente se desmonta o se cambia la ruta
    return () => {
      document.body.className = ""; // Limpiar clases
    };
  }, [location.pathname]); // Ejecutar cada vez que cambie la ruta
};

export default useCss;
