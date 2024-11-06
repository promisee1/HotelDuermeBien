import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.jsx';
import Sidebar from '../components/SidebarRecepcionista.jsx';
import { Card, Row, Col, Container } from 'react-bootstrap';
import useCss from "../assets/useCss.jsx";

const HomeRecepcionista = ({ onLogout }) => {
    useCss();
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
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
                    <h2 className="text-center mb-4">Dashboard de Recepcionista</h2>

                    <Row>
                        {/* Card para la gestión de reservas */}
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Gestión de Reservas</Card.Title>
                                    <Card.Text>
                                        Administra y organiza las reservas de los huéspedes.
                                    </Card.Text>
                                    <button className="btn btn-primary w-100">Ir a Reservas</button>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Card para la gestión de habitaciones */}
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Gestión de Habitaciones</Card.Title>
                                    <Card.Text>
                                        Verifica y actualiza el estado de las habitaciones.
                                    </Card.Text>
                                    <button className="btn btn-primary w-100">Ir a Habitaciones</button>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Card para la gestión de huéspedes */}
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Gestión de Huéspedes</Card.Title>
                                    <Card.Text>
                                        Administra los datos de los huéspedes.
                                    </Card.Text>
                                    <button className="btn btn-primary w-100">Ir a Huéspedes</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Row>
                        {/* Card para reportes */}
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Generar Reportes</Card.Title>
                                    <Card.Text>
                                        Crea reportes detallados sobre las actividades del hotel.
                                    </Card.Text>
                                    <button className="btn btn-primary w-100">Ir a Reportes</button>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Card para asignación de costos */}
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Asignación de Costos</Card.Title>
                                    <Card.Text>
                                        Calcula y asigna costos a las reservas.
                                    </Card.Text>
                                    <button className="btn btn-primary w-100">Ir a Costos</button>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Card para configuración de perfil */}
                        <Col xs={12} md={6} lg={4} className="mb-4">
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Configuración de Perfil</Card.Title>
                                    <Card.Text>
                                        Actualiza la información de tu perfil como recepcionista.
                                    </Card.Text>
                                    <button className="btn btn-primary w-100">Ir a Perfil</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default HomeRecepcionista;
