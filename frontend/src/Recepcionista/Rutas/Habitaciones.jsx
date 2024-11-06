import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/SidebarRecepcionista';
import TopBar from '../../components/TopBar';
import { Button, Container } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

Modal.setAppElement("#root");

const Habitaciones = ({ onLogout }) => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [numero_h, setNumero_h] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [estado, setEstado] = useState('');
    const [pending, setPending] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    // Abrir y cerrar modal
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // Fetch habitaciones
    const fetchHabitaciones = async () => {
        try {
            setPending(true);
            const response = await axios.get("http://localhost:5000/api/auth/habitaciones");
            setHabitaciones(response.data);
        } catch (error) {
            console.error("Error al obtener las habitaciones:", error);
        } finally {
            setPending(false);
        }
    };

    useEffect(() => {
        fetchHabitaciones();
    }, []);

    // Crear nueva habitación
    const crearHabitacion = async () => {
        try {
            const newHabitacion = {
                numero: numero_h,
                capacidad: parseInt(capacidad),  // Asegúrate de que la capacidad sea un número
                estado,
            };
            const response = await axios.post("http://localhost:5000/api/auth/habitaciones", newHabitacion,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log(response.data);
            setHabitaciones([...habitaciones, response.data]);
            toast.success("Habitación creada");
            closeModal();
        } catch (error) {
            console.error("Error al crear la habitación:", error);
            toast.error("Error al crear la habitación"); // Opcional para mostrar mensaje de error
        }
    };
    

    // Función para eliminar habitación
    const eliminarHabitacion = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/habitaciones/${id}`);
            setHabitaciones(habitaciones.filter(hab => hab.id !== id));
        } catch (error) {
            console.error("Error al eliminar la habitación:", error);
        }
    };

    // Columnas para la DataTable
    const columns = [
        { name: 'Número de Habitación', selector: row => row.numero, sortable: true },
        { name: 'Capacidad', selector: row => row.capacidad, sortable: true },
        { name: 'Estado', selector: row => row.estado, sortable: true },
        {
            name: 'Acciones',
            cell: row => (
                <>
                    <Button variant="warning" onClick={() => editHabitacion(row)}>Editar</Button>{' '}
                    <Button variant="danger" onClick={() => eliminarHabitacion(row.id)}>Eliminar</Button>
                </>
            ),
        },
    ];

    const editHabitacion = (habitacion) => {
        setNumero_h(habitacion.numero);
        setCapacidad(habitacion.capacidad);
        setEstado(habitacion.estado);
        setIsOpen(true);
    };

    return (
        <div className="d-flex">
            <Sidebar onLogout={handleLogout} />
            <div className="flex-grow-1">
                <TopBar onLogout={handleLogout} />
                <Container className="mt-4">
                    {/* Titulo */}
                    <h2 className="text-center mb-4">Estado de las Habitaciones</h2>

                    {/* Botón para anadir habitaciones */}
                    <Button variant="success" onClick={openModal}>Agregar Habitación</Button>

                    {/* DataTable para habitaciones */}
                    <DataTable
                        columns={columns}
                        data={habitaciones}
                        progressPending={pending}
                        pagination
                        responsive
                    />

                    {/* Modal para añadir o editar habitaciones */}
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                        <h2>Añadir / Editar Habitación</h2>
                        <form>
                            <div className="form-group">
                                <label>Número de Habitación</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={numero_h}
                                    onChange={e => setNumero_h(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Capacidad</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={capacidad}
                                    onChange={e => setCapacidad(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Estado</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)}
                                />
                            </div>
                            <Button variant="primary" onClick={crearHabitacion}>Guardar</Button>
                            <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
                        </form>
                    </Modal>
                </Container>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Habitaciones;
