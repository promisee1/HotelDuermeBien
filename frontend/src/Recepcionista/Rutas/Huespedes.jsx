import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import Sidebar from '../../components/SidebarRecepcionista';
import TopBar from '../../components/TopBar';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Huespedes = () => {
    const [huespedes, setHuespedes] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [nombre, setNombre] = useState('');
    const [RUT, setRUT] = useState('');
    const [numero_contacto, setnumero_contacto] = useState('');
    const [correo_electronico, setcorreo_electronico] = useState('');
    const [esResponsable, setEsResponsable] = useState(0);
    const [selectedHuesped, setSelectedHuesped] = useState(null);
    const [filteredHuespedes, setFilteredHuespedes] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        setFilteredHuespedes(
            huespedes.filter(huesped =>
                huesped.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
                huesped.RUT.toLowerCase().includes(searchText.toLowerCase()) ||
                huesped.numero_contacto.toLowerCase().includes(searchText.toLowerCase()) ||
                huesped.correo_electronico.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, huespedes]);
    // Fetch huespedes
    const fetchHuespedes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/huespedes");
            setHuespedes(response.data);
        } catch (error) {
            console.error("Error al obtener los huéspedes:", error);
        }
    };

    useEffect(() => {
        fetchHuespedes();
    }, []);

    // Handlers para abrir y cerrar los modals
    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setNombre('');
        setRUT('');
        setnumero_contacto('');
        setcorreo_electronico('');
        setEsResponsable(0);
    };

    const handleShowEditModal = (huesped) => {
        setSelectedHuesped(huesped);
        setNombre(huesped.nombre);
        setRUT(huesped.RUT);
        setnumero_contacto(huesped.numero_contacto);
        setcorreo_electronico(huesped.correo_electronico);
        setEsResponsable(huesped.es_responsable);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedHuesped(null);
        setNombre('');
        setRUT('');
        setnumero_contacto('');
        setcorreo_electronico('');
        setEsResponsable(0);
    };

    // Crear nuevo huésped
    const createHuesped = async () => {
        try {
            const nuevoHuesped = { nombre, RUT, numero_contacto, correo_electronico, es_responsable: esResponsable };
            await axios.post("http://localhost:5000/api/auth/huespedes", nuevoHuesped);
            fetchHuespedes();
            toast.success("Huésped añadido con éxito");
            handleCloseAddModal();
        } catch (error) {
            console.error("Error al crear el huésped:", error);
            toast.error("Error al crear el huésped");
        }
    };

    // Editar huésped
    const editHuesped = async () => {
        try {
            const huespedEditado = { nombre, RUT, numero_contacto, correo_electronico, es_responsable: esResponsable };
            await axios.put(`http://localhost:5000/api/auth/huespedes/${selectedHuesped.id_huesped}`, huespedEditado);
            fetchHuespedes();
            toast.success("Huésped actualizado con éxito");
            handleCloseEditModal();
        } catch (error) {
            console.error("Error al actualizar el huésped:", error);
            toast.error("Error al actualizar el huésped");
        }
    };

    // Eliminar huésped
    const deleteHuesped = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/huespedes/${id}`);
            fetchHuespedes();
            toast.success("Huésped eliminado con éxito");
        } catch (error) {
            console.error("Error al eliminar el huésped:", error);
            toast.error("Error al eliminar el huésped");
        }
    };

    // Columnas de la DataTable
    const columns = [
        { name: 'Nombre', selector: row => row.nombre, sortable: true },
        { name: 'RUT', selector: row => row.RUT, sortable: true },
        { name: 'Teléfono', selector: row => row.numero_contacto, sortable: true },
        { name: 'correo_electronico', selector: row => row.correo_electronico, sortable: true },
        { name: 'Es Responsable', selector: row => row.es_responsable ? 'Sí' : 'No', sortable: true },
        {
            name: 'Acciones',
            cell: (row) => (
                <div>
                    <Button variant="warning" onClick={() => handleShowEditModal(row)}>
                        <i className="bi bi-pencil-square"></i>
                        </Button>{' '}
                    <Button variant="danger" onClick={() => deleteHuesped(row.id_huesped)}>
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
            )
        }
    ];



    return (
        <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Contenedor principal */}
            <div className="flex-grow-1" style={{ marginLeft: "210px" }}>
                <TopBar />
                <div className="d-flex justify-content-center me-5"  >
   
                <h1 className="text-center mb-4">Listado de huéspedes</h1>
                
                <button
                    className="btn btn-primary w-25  ms-5 mb-2"
                  onClick={handleShowAddModal}
                >
                  Añadir huésped
                </button>
              </div>

                {/* Contenido de la página */}
                <div className="container-fluid">
            <DataTable
                columns={columns}
                data={filteredHuespedes}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[10, 20, 30]}
                striped
                highlightOnHover
                pointerOnHover
                noDataComponent={<div className="p-4 text-center">No se encontraron huéspedes que coincidan con la búsqueda.</div>}
                subHeader
                subHeaderComponent={
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Buscar huésped..."
                            aria-label="Buscar huésped"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                        />
                    </InputGroup>
                }
                customStyles={{
                    pagination: {
                        style: {
                            position: 'relative',
                            bottom: '-10px', // Ajusta esta posición para situar la paginación debajo
                            justifyContent: 'center',

                        },

                    },
                    rows: {
                        style: {
                          minHeight: "72px",
                        },
                      },
                      headCells: {
                        style: {
                          backgroundColor: "#f8f9fa",
                          fontWeight: "bold",
                        },
                      },
                      cells: {
                        style: {
                          paddingLeft: "50px",
                          paddingRight: "50px",
                        },
                      },    
                }}
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
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>RUT</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={RUT}
                                    onChange={(e) => setRUT(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={numero_contacto}
                                    onChange={(e) => setnumero_contacto(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>correo_electronico</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={correo_electronico}
                                    onChange={(e) => setcorreo_electronico(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Es Responsable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="Marcar si es responsable"
                                    checked={esResponsable}
                                    onChange={(e) => setEsResponsable(e.target.checked ? 1 : 0)}
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
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>RUT</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={RUT}
                                    onChange={(e) => setRUT(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={numero_contacto}
                                    onChange={(e) => setnumero_contacto(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>correo_electronico</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={correo_electronico}
                                    onChange={(e) => setcorreo_electronico(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Es Responsable</Form.Label>
                                <Form.Check
                                    type="checkbox"
                                    label="Marcar si es responsable"
                                    checked={esResponsable}
                                    onChange={(e) => setEsResponsable(e.target.checked ? 1 : 0)}
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
