import React, { useState, useEffect } from "react";
import Sidebar from "../components/SidebarRecepcionista.jsx";
import TopBar from "../components/TopBar.jsx";
import { Line, Doughnut } from "react-chartjs-2";
import { lineData, doughnutData, lineOptions, doughnutOptions } from "../assets/chartConfig.js";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useCss from "../assets/useCss.jsx";

const HomeRecepcionista = ({ onLogout }) => {
  useCss();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 992);

  const handleLogout = () => {
    onLogout();
    navigate("/login");
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateTo = (path) => {
    navigate(path);
  };

  const cardStyle = {
    maxWidth: "20rem",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} onLogout={handleLogout} />

      {/* Contenedor principal */}
      <div className={`main-content flex-grow-1 ${isOpen ? "content-shift" : ""}`}>
        <TopBar onLogout={handleLogout} toggleSidebar={toggleSidebar} />

        <div className="container-fluid mt-4">
          <div className="text-center mb-5">
            <h1 className="h3 text-primary font-weight-bold">Dashboard Recepcionista</h1>
            <p className="text-muted">Gestiona eficientemente las operaciones del hotel desde un solo lugar.</p>
          </div>

          {/* Tarjetas originales */}
          <Row className="g-4 justify-content-center mb-5">
            {[
              {
                title: "Gestión de Reservas",
                icon: "bi-calendar-check-fill",
                text: "Administra y organiza las reservas de los huéspedes.",
                path: "/recepcionista/reservas",
              },
              {
                title: "Gestión de Habitaciones",
                icon: "bi-door-open-fill",
                text: "Verifica y actualiza el estado de las habitaciones.",
                path: "/recepcionista/habitaciones",
              },
              {
                title: "Gestión de Huéspedes",
                icon: "bi-people-fill",
                text: "Administra los datos de los huéspedes.",
                path: "/recepcionista/huespedes",
              },
            ].map((card, index) => (
              <Col xs={12} sm={6} lg={4} key={index}>
                <Card
                  className="shadow-sm border-0 mx-auto"
                  style={cardStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = cardHoverStyle.transform;
                    e.currentTarget.style.boxShadow = cardHoverStyle.boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = cardStyle.boxShadow;
                  }}
                  onClick={() => navigateTo(card.path)}
                >
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <i className={`bi ${card.icon} text-primary fs-1 mb-3`}></i>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text className="text-muted">{card.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Tarjetas de habitaciones */}
          <Row className="mb-4">
            <Col xl={6} md={6} sm={12} className="mb-4">
              <div
                className="card border-left-success shadow h-100 py-2"
                style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
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
            </Col>
            <Col xl={6} md={6} sm={12} className="mb-4">
              <div
                className="card border-left-danger shadow h-100 py-2"
                style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
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
            </Col>
          </Row>

          {/* Gráficos */}
          <Row className="justify-content-center">
            <Col xl={8} lg={7} md={12} className="mb-4">
              <div
                className="card shadow"
                style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 className="m-0 font-weight-bold text-primary">Habitaciones más reservadas</h6>
                </div>
                <div className="card-body">
                  <div className="chart-area" style={{ padding: "20px" }}>
                    <Line data={lineData} options={lineOptions} className="w-100" />
                  </div>
                </div>
              </div>
            </Col>

            <Col xl={4} lg={5} md={12} className="mb-4">
              <div
                className="card shadow"
                style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
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
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HomeRecepcionista;
