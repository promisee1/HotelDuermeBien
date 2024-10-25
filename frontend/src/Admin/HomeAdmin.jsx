import Sidebar from "../components/Sidebar.jsx";
import TopBar from "../components/TopBar.jsx";

const HomeAdmin = ({ onLogout }) => {

  const handleLogout = () => {
    onLogout();
    window.location.href = "/login";
  };

  return (
    <div className="d-flex flex-column flex-lg-row">

      {/* Sidebar que se oculta en pantallas pequeñas y se expande en pantallas grandes */}
      <Sidebar onLogout={handleLogout} className="sidebar d-none d-lg-block" />

      {/* Contenido principal */}
      <div className="flex-grow-1">
        
        {/* TopBar siempre visible */}
        <TopBar onLogout={handleLogout} />

        {/* Contenedor del contenido, con márgenes ajustados */}
        <div className="container-fluid mt-4">
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
