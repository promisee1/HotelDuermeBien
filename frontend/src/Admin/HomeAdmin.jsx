import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import TopBarDropdown from "../components/TopBar.jsx";
import { Line, Doughnut } from "react-chartjs-2";
import { lineData, doughnutData, lineOptions, doughnutOptions } from "../assets/chartConfig.js";
import useBackground from "../assets/useBackground.jsx";
import { useNavigate } from "react-router-dom";
import useCss from "../assets/useCss.jsx";

const HomeAdmin = ({ onLogout }) => {
  useCss();
  useBackground("/src/assets/homeAdmin.webp");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 992);

  const handleLogout = () => {
    localStorage.removeItem('nombre_usuario'); // Elimina el nombre de usuario del localStorage
    onLogout(); // Llama a la función de cierre de sesión
    navigate("/login"); // Navega a la página de inicio de sesión
  };

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
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onLogout={handleLogout} toggleSidebar={toggleSidebar} />

      {/* Contenido principal */}
      <div className={`main-content flex-grow-1 ${isOpen ? 'content-shift' : ''}`}>
        <TopBarDropdown onLogout={handleLogout} toggleSidebar={toggleSidebar} />

        <div className="container-fluid mt-4">
          <div className="d-sm-flex align-items-center mb-4">
            <h1 className="h3 mb-0 text-white font-weight-bold bg-gradient-dark border-bottom-dark w-100 text-center mt-0">
              Dashboard
            </h1>
          </div>

          {/* Tarjetas de habitaciones */}
          <div className="row mb-4">
            <div className="col-xl-6 col-md-6 col-sm-12 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Habitaciones disponibles
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">20</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-bed fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12 mb-4">
              <div className="card border-left-danger shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                        Habitaciones ocupadas
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">10</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-door-closed fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-7 col-md-12 mb-4">
              <div className="card shadow">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Habitaciones más reservadas
                  </h6>
                </div>
                <div className="card-body">
                  <div className="chart-area" style={{ padding: "20px" }}>
                    <Line data={lineData} options={lineOptions} className="w-100" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5 col-md-12 mb-4">
              <div className="card shadow">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                </div>
                <div className="card-body">
                  <div className="chart-pie pt-4 pb-2" style={{ padding: "20px" }}>
                    <Doughnut data={doughnutData} options={doughnutOptions} className="w-100" />
                  </div>
                  <div className="mt-4 text-center small">
                    <span className="mr-2">
                      <i className="fas fa-circle text-primary"></i> Direct
                    </span>
                    <span className="mr-2">
                      <i className="fas fa-circle text-success"></i> Social
                    </span>
                    <span className="mr-2">
                      <i className="fas fa-circle text-info"></i> Referral
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
