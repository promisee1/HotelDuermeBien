import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import Sidebar from '../../components/SidebarRecepcionista';
import TopBar from '../../components/TopBar';

const huespedes = [
    { id: 1, nombre: "John Doe", edad: 25, email: "7JYwK@example.com", color: "primary" },
    { id: 2, nombre: "Jane Smith", edad: 30, email: "qTg6T@example.com", color: "secondary" },
    { id: 3, nombre: "Michael Johnson", edad: 35, email: "YRf0t@example.com", color: "success" },
];

const Huespedes = () => {
    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Contenedor principal */}
            <div className="flex-grow-1">
                {/* TopBar */}
                <TopBar />

                {/* Contenido de la página */}
                <div className="container mt-4">
                    <h2 className="text-center mb-4">Huéspedes</h2>
                    <div className="row">
                        {huespedes.map((huesped, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className={`card text-white bg-${huesped.color}`}>
                                    <div className="card-body">
                                        <h5 className="card-title">{huesped.nombre}</h5>
                                        <p className="card-text">Edad: {huesped.edad}</p>
                                        <p className="card-text">Email: {huesped.email}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Huespedes;
