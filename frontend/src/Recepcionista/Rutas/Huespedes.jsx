import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import Sidebar from "../../components/SidebarRecepcionista";
import TopBar from "../../components/TopBar";
import DataTable from "react-data-table-component";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Huespedes = ({ onSelectHuesped }) => {
  const [huespedes, setHuespedes] = useState([]);
  const [filteredHuespedes, setFilteredHuespedes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [nombre, setNombre] = useState("");
  const [RUT, setRUT] = useState("");
  const [numeroContacto, setNumeroContacto] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [esResponsable, setEsResponsable] = useState(false);
  const [selectedHuesped, setSelectedHuesped] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchHuespedes();
  }, []);

  useEffect(() => {
    setFilteredHuespedes(
      huespedes.filter(
        (huesped) =>
          huesped.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
          huesped.RUT.toLowerCase().includes(searchText.toLowerCase()) ||
          huesped.numero_contacto.toLowerCase().includes(searchText.toLowerCase()) ||
          huesped.correo_electronico.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, huespedes]);

  const fetchHuespedes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/auth/huespedes");
      setHuespedes(response.data);
    } catch (error) {
      console.error("Error al obtener los huéspedes:", error);
      toast.error("Error al cargar los huéspedes.");
    }
  };

  const validateForm = (fields) => {
    const newErrors = {};
    if (!fields.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!fields.RUT) newErrors.RUT = "El RUT es obligatorio.";
    if (!fields.numeroContacto) newErrors.numeroContacto = "El número de contacto es obligatorio.";
    if (!fields.correoElectronico) newErrors.correoElectronico = "El correo electrónico es obligatorio.";
    return newErrors;
  };

  const createHuesped = async () => {
    const fields = { nombre, RUT, numeroContacto, correoElectronico };
    const validationErrors = validateForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const nuevoHuesped = {
        nombre,
        RUT,
        numero_contacto: numeroContacto,
        correo_electronico: correoElectronico,
        es_responsable: esResponsable ? 1 : 0,
      };
      await axios.post("http://localhost:5000/api/auth/huespedes", nuevoHuesped);
      fetchHuespedes();
      toast.success("Huésped añadido con éxito");
      handleCloseAddModal();
    } catch (error) {
      console.error("Error al crear el huésped:", error);
      toast.error("Error al crear el huésped.");
    }
  };

  const editHuesped = async () => {
    const fields = { nombre, RUT, numeroContacto, correoElectronico };
    const validationErrors = validateForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const huespedEditado = {
        nombre,
        RUT,
        numero_contacto: numeroContacto,
        correo_electronico: correoElectronico,
        es_responsable: esResponsable ? 1 : 0,
      };
      await axios.put(`http://localhost:5000/api/auth/huespedes/${selectedHuesped.id_huesped}`, huespedEditado);
      fetchHuespedes();
      toast.success("Huésped actualizado con éxito");
      handleCloseEditModal();
    } catch (error) {
      console.error("Error al actualizar el huésped:", error);
      toast.error("Error al actualizar el huésped.");
    }
  };

  const deleteHuesped = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/auth/huespedes/${id}`);
      fetchHuespedes();
      toast.success("Huésped eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el huésped:", error);
      toast.error("Error al eliminar el huésped.");
    }
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  const handleShowEditModal = (huesped) => {
    setSelectedHuesped(huesped);
    setNombre(huesped.nombre);
    setRUT(huesped.RUT);
    setNumeroContacto(huesped.numero_contacto);
    setCorreoElectronico(huesped.correo_electronico);
    setEsResponsable(!!huesped.es_responsable);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNombre("");
    setRUT("");
    setNumeroContacto("");
    setCorreoElectronico("");
    setEsResponsable(false);
    setErrors({});
  };

  const columns = [
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "RUT", selector: (row) => row.RUT, sortable: true },
    { name: "Teléfono", selector: (row) => row.numero_contacto, sortable: true },
    { name: "Correo Electrónico", selector: (row) => row.correo_electronico, sortable: true },
    { name: "Es Responsable", selector: (row) => (row.es_responsable ? "Sí" : "No"), sortable: true },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <Button variant="warning" onClick={() => handleShowEditModal(row)}>
            Editar
          </Button>{" "}
          <Button variant="danger" onClick={() => deleteHuesped(row.id_huesped)}>Eliminar</Button>
        </div>
      ),
    },
  ];

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: "210px" }}>
        <TopBar />
        <h1 className="text-center mb-4">Listado de huéspedes</h1>
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <InputGroup className="w-50">
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <FormControl
                placeholder="Buscar huésped..."
                aria-label="Buscar huésped"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
              />
            </InputGroup>
            <Button className="btn btn-primary ms-2" onClick={() => setShowAddModal(true)}>
              Añadir huésped
            </Button>
          </div>
          <DataTable
            columns={columns}
            data={filteredHuespedes}
            pagination
            highlightOnHover
            pointerOnHover
            noDataComponent={<p className="text-center">No se encontraron huéspedes.</p>}
          />
        </div>

        {/* Modal para añadir huésped */}
        <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Añadir Huésped</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  type="text"
                  value={RUT}
                  onChange={(e) => setRUT(e.target.value)}
                  isInvalid={!!errors.RUT}
                />
                <Form.Control.Feedback type="invalid">{errors.RUT}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  value={numeroContacto}
                  onChange={(e) => setNumeroContacto(e.target.value)}
                  isInvalid={!!errors.numeroContacto}
                />
                <Form.Control.Feedback type="invalid">{errors.numeroContacto}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  value={correoElectronico}
                  onChange={(e) => setCorreoElectronico(e.target.value)}
                  isInvalid={!!errors.correoElectronico}
                />
                <Form.Control.Feedback type="invalid">{errors.correoElectronico}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Es Responsable"
                  checked={esResponsable}
                  onChange={(e) => setEsResponsable(e.target.checked)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={createHuesped}>Guardar</Button>
            <Button variant="secondary" onClick={handleCloseAddModal}>Cancelar</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal para editar huésped */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Editar Huésped</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  isInvalid={!!errors.nombre}
                />
                <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>RUT</Form.Label>
                <Form.Control
                  type="text"
                  value={RUT}
                  onChange={(e) => setRUT(e.target.value)}
                  isInvalid={!!errors.RUT}
                />
                <Form.Control.Feedback type="invalid">{errors.RUT}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  value={numeroContacto}
                  onChange={(e) => setNumeroContacto(e.target.value)}
                  isInvalid={!!errors.numeroContacto}
                />
                <Form.Control.Feedback type="invalid">{errors.numeroContacto}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  value={correoElectronico}
                  onChange={(e) => setCorreoElectronico(e.target.value)}
                  isInvalid={!!errors.correoElectronico}
                />
                <Form.Control.Feedback type="invalid">{errors.correoElectronico}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Es Responsable"
                  checked={esResponsable}
                  onChange={(e) => setEsResponsable(e.target.checked)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={editHuesped}>Guardar Cambios</Button>
            <Button variant="secondary" onClick={handleCloseEditModal}>Cancelar</Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />
      </div>
    </div>
  );
};

export default Huespedes;
