import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import Sidebar from '../../components/SidebarRecepcionista';
import TopBar from '../../components/TopBar';
import { Table, Container } from 'react-bootstrap';

const reservas = [
    { id: 1, nombreHuesped: 'John Doe', habitacion: 'B-01', fechaEntrada: '2024-10-30', fechaSalida: '2024-11-02', estado: 'Confirmada' },
    { id: 2, nombreHuesped: 'Jane Smith', habitacion: 'B-02', fechaEntrada: '2024-10-29', fechaSalida: '2024-11-03', estado: 'Pendiente' },
    { id: 3, nombreHuesped: 'Michael Johnson', habitacion: 'B-03', fechaEntrada: '2024-11-01', fechaSalida: '2024-11-05', estado: 'Cancelada' },
];

const Reservas = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Contenedor principal */}
            <div className="flex-grow-1" style={{ marginLeft: "210px" }}>
                {/* TopBar */}
                <TopBar />

                {/* Contenido de la página */}
                <Container className="mt-4">
                    <h2 className="text-center mb-4">Reservas</h2>

                    {/* Tabla de reservas */}
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Nombre del Huésped</th>
                                <th>Habitación</th>
                                <th>Fecha de Entrada</th>
                                <th>Fecha de Salida</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservas.map((reserva) => (
                                <tr key={reserva.id}>
                                    <td>{reserva.nombreHuesped}</td>
                                    <td>{reserva.habitacion}</td>
                                    <td>{reserva.fechaEntrada}</td>
                                    <td>{reserva.fechaSalida}</td>
                                    <td>{reserva.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    );
};

export default Reservas;
