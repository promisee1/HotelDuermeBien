import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../../components/SidebarRecepcionista';
import TopBar from '../../components/TopBar';
import { Button, Container, Card, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Habitaciones = ({ onLogout }) => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [idHabitacion, setIdHabitacion] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalEditarHabitacionIsOpen, setModalEditarHabitacionIsOpen] = useState(false);
    const [numero_habitacion, setNumero_habitacion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [estado_id, setEstado_id] = useState('');
    const [orientacion, setOrientacion] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    // Abrir y cerrar modal para agregar habitación
    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        // Limpiar campos al cerrar el modal
        setNumero_habitacion('');
        setCapacidad('');
        setOrientacion('');
        setEstado_id('');
    };

    // Abrir y cerrar modal para editar habitación
    const openModalEditarHabitacion = (habitacion) => {
        setIdHabitacion(habitacion.id_habitacion);
        setNumero_habitacion(habitacion.numero_habitacion);
        setCapacidad(habitacion.capacidad);
        setOrientacion(habitacion.orientacion);
        setEstado_id(habitacion.estado_id);
        setModalEditarHabitacionIsOpen(true);
    };

    const closeModalEditarHabitacion = () => {
        setModalEditarHabitacionIsOpen(false);
        setIdHabitacion('');
        setNumero_habitacion('');
        setCapacidad('');
        setOrientacion('');
        setEstado_id('');
    };

    // Traducción del estado_id
    const getEstadoTexto = (estadoId) => {
        switch (estadoId) {
            case 1:
                return "Disponible";
            case 2:
                return "Ocupada";
            case 3:
                return "En mantenimiento";
            default:
                return "Desconocido";
        }
    };

    // Fetch habitaciones
    const fetchHabitaciones = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/habitaciones");
            setHabitaciones(response.data);
        } catch (error) {
            console.error("Error al obtener las habitaciones:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchHabitaciones();
    }, []);

    // Crear nueva habitación
    const crearHabitacion = async () => {
        try {
            const newHabitacion = {
                numero_habitacion,
                capacidad: parseInt(capacidad),
                orientacion,
                estado_id: parseInt(estado_id)
            };
            const response = await axios.post("http://localhost:5000/api/auth/habitaciones", newHabitacion, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setHabitaciones([...habitaciones, response.data]);
            toast.success("Habitación creada");
            closeModal();
        } catch (error) {
            console.error("Error al crear la habitación:", error);
            toast.error("Error al crear la habitación");
        }
    };

    // Editar habitación
    const guardarCambiosHabitacion = async () => {
        try {
            const habitacionEditada = {
                numero_habitacion: numero_habitacion,
                capacidad: parseInt(capacidad),
                orientacion,
                estado_id: parseInt(estado_id)
            };
            await axios.put(`http://localhost:5000/api/auth/habitaciones/${idHabitacion}`, habitacionEditada, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setHabitaciones(habitaciones.map(hab => 
                hab.id_habitacion === idHabitacion ? { ...hab, ...habitacionEditada } : hab
            ));
            toast.success("Habitación actualizada correctamente");
            closeModalEditarHabitacion();
        } catch (error) {
            console.error("Error al actualizar la habitación:", error);
            toast.error("Error al actualizar la habitación");
        }
    };

    // Eliminar habitación
    const eliminarHabitacion = async (id_habitacion) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/habitaciones/${id_habitacion}`);
            setHabitaciones(habitaciones.filter(hab => hab.id_habitacion !== id_habitacion));
            toast.success("Habitación eliminada");
        } catch (error) {
            console.error("Error al eliminar la habitación:", error);
            toast.error("Error al eliminar la habitación");
        }
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            <Sidebar onLogout={handleLogout} />

            <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: "210px" }}>
                <TopBar onLogout={handleLogout} />

                <div className="d-flex justify-content-between align-items-center mb-4 me-3 ms-3 py-3">
                    <h2 className="text-center flex-grow-1 font-weight-bold">Estado de las Habitaciones</h2>
                    <Button variant="success w-25" onClick={openModal}>Agregar Habitación</Button>
                </div>
                <Container className="mt-4 mb-5">
                    <Row className="justify-content-center mt-5 z-2">
                        {habitaciones.map(habitacion => (
                            <Col key={habitacion.id_habitacion} sm={6} md={4} lg={3} className="mb-4">
                                <Card className="shadow-sm h-100">
                                    <Card.Body>
                                        <Card.Title className="text-center">Habitación {habitacion.numero_habitacion}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted text-center">
                                            Capacidad: {habitacion.capacidad}
                                        </Card.Subtitle>
                                        <Card.Text className="text-center">
                                            Orientación: {habitacion.orientacion} <br />
                                            Estado: {getEstadoTexto(habitacion.estado_id)}
                                        </Card.Text>
                                        <div className="d-flex justify-content-around mt-3">
                                            <Button variant="warning" onClick={() => openModalEditarHabitacion(habitacion)}>Editar</Button>
                                            <Button variant="danger" onClick={() => eliminarHabitacion(habitacion.id_habitacion)}>Eliminar</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    {/* Modal para añadir habitación */}
                    <Modal show={modalIsOpen} onHide={closeModal} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Añadir Habitación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group mb-3">
                                    <label>Número de Habitación</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={numero_habitacion}
                                        onChange={e => setNumero_habitacion(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Capacidad</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={capacidad}
                                        onChange={e => setCapacidad(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Orientación</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={orientacion}
                                        onChange={e => setOrientacion(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Estado</label>
                                    <select
                                        className="form-control"
                                        value={estado_id}
                                        onChange={e => setEstado_id(e.target.value)}
                                    >
                                        <option value="default">Seleccionar...</option>
                                        <option value="1">Disponible</option>
                                        <option value="2">Ocupada</option>
                                        <option value="3">En mantenimiento</option>
                                    </select>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={crearHabitacion}>Guardar</Button>
                            <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal para editar habitación */}
                    <Modal show={modalEditarHabitacionIsOpen} onHide={closeModalEditarHabitacion} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Editar Habitación</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group mb-3">
                                    <label>Número de Habitación</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={numero_habitacion}
                                        onChange={e => setNumero_habitacion(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Capacidad</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={capacidad}
                                        onChange={e => setCapacidad(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Orientación</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={orientacion}
                                        onChange={e => setOrientacion(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Estado</label>
                                    <select
                                        className="form-control"
                                        value={estado_id}
                                        onChange={e => setEstado_id(e.target.value)}
                                    >
                                        <option value="default">Seleccionar...</option>
                                        <option value="1">Disponible</option>
                                        <option value="2">Ocupada</option>
                                        <option value="3">En mantenimiento</option>
                                    </select>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={guardarCambiosHabitacion}>Guardar Cambios</Button>
                            <Button variant="secondary" onClick={closeModalEditarHabitacion}>Cancelar</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Habitaciones;
