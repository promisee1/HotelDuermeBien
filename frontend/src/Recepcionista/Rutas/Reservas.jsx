import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarRecepcionista";
import TopBar from "../../components/TopBar";
import { Button, Container, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [huespedes, setHuespedes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const [selectedHuesped, setSelectedHuesped] = useState("");
  const [selectedHabitacion, setSelectedHabitacion] = useState("");
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");

  // Cargar datos iniciales
  useEffect(() => {
    fetchReservas();
    fetchHuespedes();
    fetchHabitaciones();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/reservas");
      setReservas(response.data);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      toast.error("Error al cargar las reservas.");
    }
  };

  const fetchHuespedes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/huespedes");
      setHuespedes(response.data);
    } catch (error) {
      console.error("Error al obtener huéspedes:", error);
      toast.error("Error al cargar los huéspedes.");
    }
  };

  const fetchHabitaciones = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/habitaciones");
      setHabitaciones(response.data);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
      toast.error("Error al cargar las habitaciones.");
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedHuesped("");
    setSelectedHabitacion("");
    setFechaEntrada("");
    setFechaSalida("");
  };

  const createReserva = async () => {
    if (!selectedHuesped || !selectedHabitacion || !fechaEntrada || !fechaSalida) {
      toast.error("Todos los campos son obligatorios.");
      return;
    }

    const nuevaReserva = {
      huespedId: selectedHuesped,
      habitacionId: selectedHabitacion,
      fechaEntrada,
      fechaSalida,
    };

    try {
      await axios.post("http://localhost:5000/api/auth/reservas", nuevaReserva);
      toast.success("Reserva creada correctamente.");
      fetchReservas();
      closeModal();
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      toast.error("Error al crear la reserva.");
    }
  };

  const getHuespedNombre = (huespedId) => {
    const huesped = huespedes.find((h) => h.id_huesped === huespedId);
    return huesped ? huesped.nombre : "Desconocido";
  };

  const getHabitacionNumero = (habitacionId) => {
    const habitacion = habitaciones.find((h) => h.id_habitacion === habitacionId);
    return habitacion ? habitacion.numero_habitacion : "Desconocido";
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-grow-1" style={{ marginLeft: "210px" }}>
        {/* TopBar */}
        <TopBar />

        <Container fluid className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary">Reservas</h2>
            <Button variant="success" onClick={openModal}>
              Nueva Reserva
            </Button>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Huésped</th>
                <th>Habitación</th>
                <th>Fecha de Entrada</th>
                <th>Fecha de Salida</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id_reserva}>
                  <td>{getHuespedNombre(reserva.huespedId)}</td>
                  <td>{getHabitacionNumero(reserva.habitacionId)}</td>
                  <td>{reserva.fechaEntrada}</td>
                  <td>{reserva.fechaSalida}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* Modal para nueva reserva */}
        <Modal show={modalIsOpen} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Crear Nueva Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Huésped</Form.Label>
                <Form.Select
                  value={selectedHuesped}
                  onChange={(e) => setSelectedHuesped(e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  {huespedes.map((huesped) => (
                    <option key={huesped.id_huesped} value={huesped.id_huesped}>
                      {huesped.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Habitación</Form.Label>
                <Form.Select
                  value={selectedHabitacion}
                  onChange={(e) => setSelectedHabitacion(e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  {habitaciones
                    .filter((habitacion) => habitacion.estado_id === 1) // Solo habitaciones disponibles
                    .map((habitacion) => (
                      <option key={habitacion.id_habitacion} value={habitacion.id_habitacion}>
                        {habitacion.numero_habitacion}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Entrada</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaEntrada}
                  onChange={(e) => setFechaEntrada(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Salida</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaSalida}
                  onChange={(e) => setFechaSalida(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={createReserva}>
              Guardar
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Reservas;
