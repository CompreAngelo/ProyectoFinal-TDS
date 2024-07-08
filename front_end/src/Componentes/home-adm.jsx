import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/admcss.css";
import axios from 'axios';
import Footer from './Comp_Helpers/Footer.jsx';
import Navbaradm from './Comp_Helpers/Navbaradm.jsx';
import Topbar from './Comp_Helpers/Topbar.jsx';
import { useAuth } from '../context/provider.jsx';

function HomeAdm() {
  const {actualizarAgentes} = useAuth()
  const [isChecked, setIsChecked] = useState(true);
  const [agents, setAgents] = useState([]); // Estado para almacenar los agentes
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    rol: '',
    estado: '',
    horario_entrada: '',
    horario_salida: '',
    telefono: ''
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    telefono: '',
    contrasena: '',
    confirmarContrasena: '',
    correo: '',
    estatus:'ACTIVO',
    salario: '',
    horario_entrada: '',
    horario_salida: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // Número de elementos por página
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filterValue, setFilterValue] = useState('');


  const handleCloseModal = async () => {
    try {
      console.log('Datos del formulario:', formData); // Mostrar todos los datos del formulario en la consola
      const response = await axios.post('http://localhost:4000/registerAgent', formData);
      console.log('TELEFONO:'+formData.telefono)
      if (response.status === 201) {
        console.log('Agente registrado correctamente:', response.data);
        
      } else {
        console.error('Error al registrar el agente:', response.data);
        
      }
    } catch (error) {
      console.error('Error al enviar la solicitud al servidor:', error);
    }
    actualizarAgentes()
    // Cerrar el modal
    setShowModal(false);
  };
  

  

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  // Función para obtener los datos de los agentes
  const fetchAgents = async () => {
    actualizarAgentes()
    try {
      const response = await axios.get('http://localhost:4000/agents'); // Asegúrate de cambiar la URL por la correcta de tu backend
      setAgents(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  // Llama a fetchAgents cuando el componente se monta
  useEffect(() => {
    fetchAgents(currentPage);
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchAgents(pageNumber);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(agents) ? agents.slice(indexOfFirstItem, indexOfLastItem) : [];

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  }

  const filteredItems = currentItems.filter((agent) => {
    const searchData = `${agent.cedula} ${agent.nombre} ${agent.apellido}`.toLowerCase();
    const filterData = filterValue.toLowerCase();
    return (
      (searchData.includes(searchKeyword.toLowerCase()) || searchKeyword === '') &&
      (filterValue === '' || agent.estado.toLowerCase() === filterData)
    );
  });

  const handleDetailsModalOpen = (agent) => {
    setSelectedAgent(agent);
    setShowDetailsModal(true);
  };

  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);
  };

  const handleEditModalOpen = (agent) => {
    setSelectedAgent(agent);
    setEditData({
      id: agent.id,
      rol: agent.role,
      estado: agent.estado,
      horario_entrada: agent.horario_entrada,
      horario_salida: agent.horario_salida,
      telefono: agent.telefono
    });
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setErrors({}); // Limpiar los errores al cerrar el modal
  };
  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };

  const handleSaveChanges = async () => {

    // Validaciones del modal de editar datos del agente
    const newErrors = {};

    if (!editData.rol || !editData.estado || !editData.horario_entrada || !editData.horario_salida || !editData.telefono) {
      newErrors.general = "Todos los campos son obligatorios.";
      setErrors(newErrors);
      toast.error(newErrors.general);
      return;
    }

    if (!/^\d{10}$/.test(editData.telefono)) {
      newErrors.telefono = "El número de teléfono debe contener 10 dígitos.";
      setErrors(newErrors);
      toast.error(newErrors.telefono);
      return;
    }

    // Simulación de actualización exitosa
    toast.success("Los datos fueron actualizados exitosamente.");
    setTimeout(() => {
      handleEditModalClose();
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones para la crear agente
    if (
      formData.nombre.trim() === '' ||
      formData.apellido.trim() === '' ||
      formData.cedula.trim() === '' ||
      formData.telefono.trim() === '' ||
      formData.contrasena.trim() === '' ||
      formData.confirmarContrasena.trim() === '' ||
      formData.correo.trim() === '' ||
      formData.salario.trim() === '' ||
      formData.horario_entrada.trim() === '' ||
      formData.horario_salida.trim() === ''
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (formData.cedula.length !== 11) {
      toast.error('La cédula debe tener 11 dígitos');
      return;
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    toast.success('El agente fue agregado exitosamente');
    setTimeout(() => {
      handleCloseModal();
    }, 2000);
  }
  const handleSaveChanges1 = async () => {
    if (!editData.id) {
      toast.error("Error: No se ha seleccionado ningún agente válido.");
      console.log("Error: No se ha seleccionado ningún agente válido.", errors)
      return;
    }

    try {
      const response = await axios.put(`http://localhost:4000/updateAgent/${editData.id}`, {
        rol: editData.rol,
        estado: editData.estado,
        horarioEntrada: editData.horarioEntrada,
        horarioSalida: editData.horarioSalida,
        telefono: editData.telefono
      });

      if (response.status === 200) {
        actualizarAgentes();
        toast.success("Los datos fueron actualizados exitosamente.");
        handleEditModalClose(); // Cierra el modal después de la actualización exitosa
      } else {
        toast.error("No se pudo actualizar la información del agente.");
      }
    } catch (error) {
      console.error('Error al actualizar los datos del agente:', error);
      toast.error('Error al actualizar los datos: ' + (error.response?.data?.error || 'Error desconocido'));
    }
  };
  return (
    <>
      <div id="page-top"></div>
      <div id="wrapper">
        <Navbaradm />
        <div className="d-flex flex-column" id="content-wrapper">
          <Topbar titulo="Administración de agentes" />
          <div className="add-agent-button">
            <button className="Button2" onClick={handleShowModal} >Agregar Agente</button>
          </div>
          <div className="card-body">
            <div className="filtros">
              <div className="search">
                <input placeholder="Buscar..." required="" type="text" value={searchKeyword} onChange={handleSearchInputChange} />
                <i className="fa-solid fa-magnifying-glass" value={searchKeyword} onChange={handleSearchInputChange}></i>
              </div>
              <div className="filter-container">
                <select id="estadoFilter" className="filter-select" value={filterValue} onChange={handleFilterChange}>
                  <option value="">Todos</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
                <label htmlFor="estadoFilter" className="filter-label">Filtrar por Estado</label>
              </div>
            </div>
            <div className="table-responsive text-center table mt-2" id="dataTable-1" role="grid" aria-describedby="dataTable_info">
              <table className="table table-striped table-bordered my-0" id="dataTable">
                <thead>
                  <tr>
                    <th className="text-center titulo">Cédula</th>
                    <th className="text-center titulo">Nombre</th>
                    <th className="text-center titulo">Apellido</th>
                    <th className="text-center titulo">Estado</th>
                    <th className="text-center titulo">Horario entrada</th>
                    <th className="text-center titulo">Horario salida</th>
                    <th className="text-center titulo">Salario</th>
                    <th className="text-center titulo">Teléfono</th>
                    <th className="text-center titulo">Rol</th>
                    <th className="text-center titulo">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((agent, index) => (
                    <tr key={index}>
                      <td>{agent.cedula}</td>
                      <td>{agent.nombre}</td>
                      <td>{agent.apellido}</td>
                      <td><span className='estadoadm' style={{
                        background: agent.estado === 'ACTIVO' ? '#048337' : agent.estado === 'INACTIVO' ? 'red' : 'black',
                      }}
                      >{agent.estado}</span></td>
                      <td>{agent.horario_entrada}</td>
                      <td>{agent.horario_salida}</td>
                      <td>{agent.salario}</td>
                      <td>{agent.telefono}</td>
                      <td>{agent.role}</td>
                      <td>
                        <div className="btn-group">
                          <div class="tooltip-container1">
                            <span class="text1" onClick={() => handleDetailsModalOpen(agent)}><i class="fa-solid fa-eye"></i></span>
                            <span class="tooltip1">Detalles</span>
                          </div>
                          <div class="tooltip-container1">
                            <span class="text1" onClick={() => handleEditModalOpen(agent)}><i class="fa-solid fa-pen-to-square"></i></span>
                            <span class="tooltip1">Editar</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col">
                <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">«</span>
                      </button>
                    </li>
                    {Array.from(
                      { length: Math.ceil((agents?.length ?? 0) / itemsPerPage) },
                      (_, index) => (
                        <li
                          key={index}
                          className={`page-item ${currentPage === index + 1 ? "active" : ""
                            }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      )
                    )}
                    <li
                      className={`page-item ${currentPage === Math.ceil((agents?.length ?? 0) / itemsPerPage)
                          ? "disabled"
                          : ""
                        }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        aria-label="Next"
                      >
                        <span aria-hidden="true">»</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div >

      <Toaster />
      {/* Modal para mostrar detalles del agente */}
      <Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
          <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Detalles del agente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAgent && (
            <div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Cédula:</label>
                    <input type="text" className="form-control" value={selectedAgent.cedula} readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Nombre:</label>
                    <input type="text" className="form-control" value={selectedAgent.nombre} readOnly />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Apellido:</label>
                    <input type="text" className="form-control" value={selectedAgent.apellido} readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Estado:</label>
                    <input type="text" className="form-control" value={selectedAgent.estado} readOnly />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Horario Entrada:</label>
                    <input type="text" className="form-control" value={selectedAgent.horario_entrada} readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Horario Salida:</label>
                    <input type="text" className="form-control" value={selectedAgent.horario_salida} readOnly />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Salario:</label>
                    <input type="text" className="form-control" value={selectedAgent.salario} readOnly />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Teléfono:</label>
                    <input type="text" className="form-control" value={selectedAgent.telefono} readOnly />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-15 ">
                  <div className="form-group mb-3">
                    <label className="fw-bold">Rol:</label>
                    <input type="text" className="form-control" value={selectedAgent.role} readOnly />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsModalClose}>Cerrar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para editar datos del agente */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
          <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Editar Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Rol:</Form.Label>
                  <Form.Control
                    type="text"
                    name="rol"
                    value={editData.rol}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Estado:</Form.Label>
                  <Form.Control as="select" name="estado" value={editData.estado} onChange={handleEditInputChange}>
                    <option value="activo">Elige una opcion</option>
                    <option value="ACTIVO">Activo</option>
                    <option value="INACTIVO">Inactivo</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Horario de Entrada:</Form.Label>
                  <Form.Control
                    type="time"
                    name="horarioEntrada"
                    value={editData.horarioEntrada}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Horario de Salida:</Form.Label>
                  <Form.Control
                    type="time"
                    name="horarioSalida"
                    value={editData.horarioSalida}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-15">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Teléfono:</Form.Label>
                  <Form.Control
                    type="text"
                    name="telefono"
                    value={editData.telefono}
                    onChange={handleEditInputChange}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>Cerrar</Button>
          <Button className="Button2" onClick={handleSaveChanges1}>Guardar Cambios</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
          <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Agregar Agente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Nombre:</Form.Label>
                  <Form.Control type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Apellido:</Form.Label>
                  <Form.Control type="text" name="apellido" value={formData.apellido} onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Cédula:</Form.Label>
                  <Form.Control type="text" name="cedula" value={formData.cedula} onChange={handleChange} />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Teléfono:</Form.Label>
                  <Form.Control type="text" name="telefono" value={formData.telefono} onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Contraseña:</Form.Label>
                  <Form.Control type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Confirmar Contraseña:</Form.Label>
                  <Form.Control type="password" name="confirmarContrasena" value={formData.confirmarContrasena} onChange={handleChange} />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Correo:</Form.Label>
                  <Form.Control type="email" name="correo" value={formData.correo} onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Estatus:</Form.Label>
                  <Form.Control as="select" name="estatus" value={formData.estatus} onChange={handleChange}>
                    <option value="activo">ACTIVO</option>
                    <option value="inactivo">INACTIVO</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Salario:</Form.Label>
                  <Form.Control type="number" name="salario" value={formData.salario} onChange={handleChange} />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Hora de Entrada:</Form.Label>
                  <Form.Control type="time" name="horario_entrada" value={formData.horario_entrada} onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col-md-4">
                   <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Hora de Salida:</Form.Label>
                  <Form.Control
                    type="time"
                    name="horario_salida"
                    value={formData.horario_salida}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
          <Button className="Button2" onClick={handleSubmit}>Agregar Agente</Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default HomeAdm;