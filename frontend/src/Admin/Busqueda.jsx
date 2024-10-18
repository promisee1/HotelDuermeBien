import React, { useState, useEffect } from 'react';

const Busqueda = ({ usuarios, setUsuariosFiltrados }) => {
    const [busqueda, setBusqueda] = useState('');

    const handleInputChange = (e) => {
    setBusqueda(e.target.value);
    };

    useEffect(() => {
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombre_usuario.toLowerCase().includes(busqueda.toLowerCase())
    );
    setUsuariosFiltrados(usuariosFiltrados);
    }, [busqueda, usuarios, setUsuariosFiltrados]);

    return (
    <div>
        <input
            className="form-control"
            placeholder="Nombre..."
            value={busqueda}
            onChange={handleInputChange}
        />
        </div>
    );
};

export default Busqueda;
