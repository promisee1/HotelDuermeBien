import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import './headerRecepcionista.css'; // Importamos los estilos personalizados del header
import HeaderRecepcionista from './headerRecepcionista';

const habitaciones = [
    { numero: 'B-01', capacidad: 3, estado: 'Ocupada', color: 'success' },
    { numero: 'B-02', capacidad: 3, estado: 'Vacante', color: 'success' },
    { numero: 'B-03', capacidad: 2, estado: 'Vacante', color: 'success' },
    { numero: 'B-04', capacidad: 2, estado: 'Vacante', color: 'success' },
    { numero: 'B-05', capacidad: 2, estado: 'Vacante', color: 'success' },
    { numero: 'B-06', capacidad: 3, estado: 'Vacante', color: 'success' },
    { numero: 'B-07', capacidad: 5, estado: 'Vacante', color: 'success' },
    { numero: 'B-08', capacidad: 3, estado: 'Ocupada', color: 'success' },
    { numero: 'B-09', capacidad: 4, estado: 'En mantenimiento', color: 'secondary' },
];

const HomeRecepcionista = () => {
    return (
        <div>
            <HeaderRecepcionista />
            <div className="container mt-4">
                <h2 className="text-center mb-4">Listado de habitaciones</h2>
                <div className="row">
                    {habitaciones.map((hab) => (
                        <div key={hab.numero} className="col-md-4 mb-3">
                            <div className={`card text-white bg-${hab.color}`}>
                                <div className="card-body">
                                    <h5 className="card-title">Nro: {hab.numero}</h5>
                                    <p className="card-text">
                                        Capacidad: {hab.capacidad} huéspedes
                                    </p>
                                    <p className="card-text">Estado: {hab.estado}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomeRecepcionista;
