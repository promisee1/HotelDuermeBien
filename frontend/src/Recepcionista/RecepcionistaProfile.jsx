import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SidebarRecepcionista";
import TopBar from "../components/TopBar";
import { Container } from "react-bootstrap";

const RecepcionistaProfile = ({ onLogout }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };
    return (
  <div className="d-flex">
            {/* Sidebar */}
            <Sidebar onLogout={handleLogout} />

            {/* Contenedor principal */}
            <div className="flex-grow-1">
                {/* TopBar */}
                <TopBar onLogout={handleLogout} />

                {/* Contenido central */}
                <Container fluid className="mt-4">
                    <h2 className="text-center mb-4">Mi perfil</h2>
                    {/* Aqui irá el contenido de la página de perfil */}
                    </Container>
            </div>
        </div>
        
    );
};

export default RecepcionistaProfile;