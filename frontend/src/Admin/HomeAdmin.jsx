import React from "react";
import Sidebar from "../components/Sidebar.jsx";
import TopBar from "../components/TopBar.jsx";
import { Line, Doughnut } from "react-chartjs-2"; // Importar los componentes de gráficos
import { lineData, doughnutData, lineOptions, doughnutOptions } from "../assets/chartConfig.js"; // Importar la configuración de gráficos

const HomeAdmin = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
    window.location.href = "/login";
  };

  return (
    <div className="d-flex flex-column flex-lg-row">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} className="sidebar d-none d-lg-block" />

      {/* Contenido principal */}
      <div className="flex-grow-1">
        <TopBar onLogout={handleLogout} />

        <div className="container-fluid mt-4">
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
          </div>

          <div className="row mb-4">
            <div className="col-xl-6 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Habitaciones disponibles
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        20
                      </div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-bed fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 mb-4">
              <div className="card border-left-danger shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                        Habitaciones ocupadas
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">
                        10
                      </div>
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
            <div className="col-xl-8 col-lg-7 mb-4">
              <div className="card shadow">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Earnings Overview
                  </h6>
                </div>
                <div className="card-body">
                  <div className="chart-area" style={{ padding: "20px" }}>
                    <Line data={lineData} options={lineOptions} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-lg-5 mb-4">
              <div className="card shadow">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Revenue Sources
                  </h6>
                </div>
                <div className="card-body">
                  <div className="chart-pie pt-4 pb-2" style={{ padding: "20px" }}>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
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
