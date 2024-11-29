import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SidebarRecepcionista";
import TopBar from "../../components/TopBar";
import { Button, Container, Card, Row, Col, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Habitaciones = ({ onLogout }) => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [idHabitacion, setIdHabitacion] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalEditarHabitacionIsOpen, setModalEditarHabitacionIsOpen] = useState(false);
  const [numero_habitacion, setNumero_habitacion] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [estado_id, setEstado_id] = useState("");
  const [orientacion, setOrientacion] = useState("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    resetFields();
  };

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
    resetFields();
  };

  const resetFields = () => {
    setIdHabitacion("");
    setNumero_habitacion("");
    setCapacidad("");
    setEstado_id("");
    setOrientacion("");
  };

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

  const fetchHabitaciones = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/habitaciones");
      setHabitaciones(response.data);
    } catch (error) {
      toast.error("Error al cargar las habitaciones.");
    }
  };

  useEffect(() => {
    fetchHabitaciones();
  }, []);

  const crearHabitacion = async () => {
    if (!numero_habitacion || !capacidad || !estado_id || !orientacion) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const nuevaHabitacion = {
        numero_habitacion,
        capacidad: parseInt(capacidad, 10),
        orientacion,
        estado_id: parseInt(estado_id, 10),
      };
      const response = await axios.post("http://localhost:5000/api/auth/habitaciones", nuevaHabitacion, {
        headers: { "Content-Type": "application/json" },
      });

      setHabitaciones([...habitaciones, response.data]);
      toast.success("Habitación creada correctamente.");
      closeModal();
    } catch (error) {
      toast.error("Error al crear la habitación.");
    }
  };

  const guardarCambiosHabitacion = async () => {
    if (!numero_habitacion || !capacidad || !estado_id || !orientacion) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    try {
      const habitacionEditada = {
        numero_habitacion,
        capacidad: parseInt(capacidad, 10),
        orientacion,
        estado_id: parseInt(estado_id, 10),
      };
      await axios.put(`http://localhost:5000/api/auth/habitaciones/${idHabitacion}`, habitacionEditada, {
        headers: { "Content-Type": "application/json" },
      });

      setHabitaciones(
        habitaciones.map((hab) =>
          hab.id_habitacion === idHabitacion ? { ...hab, ...habitacionEditada } : hab
        )
      );
      toast.success("Habitación actualizada correctamente.");
      closeModalEditarHabitacion();
    } catch (error) {
      toast.error("Error al actualizar la habitación.");
    }
  };

  const eliminarHabitacion = async (id_habitacion) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/habitaciones/${id_habitacion}`);
      setHabitaciones(habitaciones.filter((hab) => hab.id_habitacion !== id_habitacion));
      toast.success("Habitación eliminada correctamente.");
    } catch (error) {
      toast.error("Error al eliminar la habitación.");
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div
        className="flex-grow-1 d-flex flex-column"
        style={{
          marginLeft: "210px", // Cambiado a 210px
        }}
      >
        {/* TopBar */}
        <TopBar />

        {/* Contenido */}
        <Container fluid className="mt-4 px-4">
          {/* Título y botón */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary font-weight-bold text-center w-100">Habitaciones</h2>
            <Button variant="success" onClick={openModal}>
              Agregar Habitación
            </Button>
          </div>

          {/* Tarjetas */}
          <Row className="g-4">
            {habitaciones.length > 0 ? (
              habitaciones.map((habitacion) => (
                <Col key={habitacion.id_habitacion} sm={12} md={6} lg={4}>
                  <Card
                    className={`shadow border-${
                      habitacion.estado_id === 1
                        ? "success"
                        : habitacion.estado_id === 2
                        ? "danger"
                        : "warning"
                    }`}
                  >
                    <Card.Body>
                      <Card.Title className="text-center">Habitación {habitacion.numero_habitacion}</Card.Title>
                      <Card.Text>
                        <strong>Capacidad:</strong> {habitacion.capacidad}
                        <br />
                        <strong>Orientación:</strong> {habitacion.orientacion}
                        <br />
                        <strong>Estado:</strong> {getEstadoTexto(habitacion.estado_id)}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button variant="warning" size="sm" onClick={() => openModalEditarHabitacion(habitacion)}>
                          Editar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => eliminarHabitacion(habitacion.id_habitacion)}>
                          Eliminar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center">No hay habitaciones disponibles.</p>
            )}
          </Row>
        </Container>

        {/* Modales */}
        <Modal show={modalIsOpen} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Añadir Habitación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Número de Habitación</Form.Label>
                <Form.Control
                  type="text"
                  value={numero_habitacion}
                  onChange={(e) => setNumero_habitacion(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacidad</Form.Label>
                <Form.Control
                  type="number"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Orientación</Form.Label>
                <Form.Select value={orientacion} onChange={(e) => setOrientacion(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option value="Norte">Norte</option>
                  <option value="Sur">Sur</option>
                  <option value="Este">Este</option>
                  <option value="Oeste">Oeste</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select value={estado_id} onChange={(e) => setEstado_id(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option value="1">Disponible</option>
                  <option value="2">Ocupada</option>
                  <option value="3">En mantenimiento</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={crearHabitacion}>
              Guardar
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={modalEditarHabitacionIsOpen} onHide={closeModalEditarHabitacion} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Habitación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Número de Habitación</Form.Label>
                <Form.Control
                  type="text"
                  value={numero_habitacion}
                  onChange={(e) => setNumero_habitacion(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacidad</Form.Label>
                <Form.Control
                  type="number"
                  value={capacidad}
                  onChange={(e) => setCapacidad(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Orientación</Form.Label>
                <Form.Select value={orientacion} onChange={(e) => setOrientacion(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option value="Norte">Norte</option>
                  <option value="Sur">Sur</option>
                  <option value="Este">Este</option>
                  <option value="Oeste">Oeste</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select value={estado_id} onChange={(e) => setEstado_id(e.target.value)}>
                  <option value="">Seleccionar...</option>
                  <option value="1">Disponible</option>
                  <option value="2">Ocupada</option>
                  <option value="3">En mantenimiento</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={guardarCambiosHabitacion}>
              Guardar Cambios
            </Button>
            <Button variant="secondary" onClick={closeModalEditarHabitacion}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Habitaciones;
