import React, { useEffect,useRef, useState } from "react";
import { Modal, Button, Form, FormControl } from 'react-bootstrap';
import axios from "axios";
import { useAuth } from "../../context/provider";
import Cards from 'react-credit-cards-2/';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import toast, { Toaster } from 'react-hot-toast';
import { PayPalButton } from "react-paypal-button-v2";
import "../../Css/adicciones.css";

const Ultimamult = () => {
  const { user, actualizarMultaUsuario } = useAuth();
  const [multas, setMultas] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedMulta, setSelectedMulta] = useState(null);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportDescription, setReportDescription] = useState("");
  const [reportValidationError, setReportValidationError] = useState(false);
 
  const [tipoReport, setTipoReport] = useState(""); // Estado para el filtro
  const [nombreAgente, setNombreAgente] = useState("");
  const [showPayModal, setShowPayModal] = useState(false);
  const [itemsPerPage] = useState(5);
  const [selectedMultaAmount, setSelectedMultaAmount] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedMultaId, setSelectedMultaId] = useState(null);
  const [creditCardData, setCreditCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
    focus: '',
  });
  

  

  const handleDetailsModalOpen = (multa) => {
    setSelectedMulta(multa);
    setShowDetailsModal(true);
  };

  const handleDetailsModalClose = () => {
    setShowDetailsModal(false);

}
  const handlePaymentSuccess = async (details, multaId) => {
    try {
      // Aquí llamas a tu API para actualizar el estado de la multa
      const response = await axios.post('http://localhost:4000/updateMulta', {
        multaId: multaId,
        estado: 'PAGADO',
      });
  
      if (response.status === 200) {
        toast.success("Pago exitoso: " + details.id);
        // Actualizar el estado local de las multas para reflejar el cambio
        const multasActualizadas = multas.map(multa =>
          multa.id === multaId ? { ...multa, estado: 'PAGADO' } : multa
        );
        setMultas(multasActualizadas);
      } else {
        // Manejar respuesta no exitosa
        toast.error("No se pudo actualizar el estado de la multa.");
      }
    } catch (error) {
      console.error("Error actualizando el estado de la multa: ", error);
      toast.error("Error al actualizar el estado de la multa.");
    }
  };
  const convertirMontoANumero = (monto) => {
    // Eliminar el prefijo de moneda y las comas, luego convertir a flotante
    const numero = parseFloat(monto.replace(/RD\$/g, '').replace(/,/g, ''));
    return numero;
  };

  const handlePayModalOpen = (monto, multaId) => {
    const montoNumerico = convertirMontoANumero(monto);
    setSelectedMultaAmount(montoNumerico);
    setSelectedMultaId(multaId); // Guardar el ID de la multa seleccionada
    setShowPayModal(true);
  };

  const handlePayModalClose = () => {
    setShowPayModal(false);
    setSelectedMultaAmount(null); // Restablece el monto de la multa seleccionada al cerrar el modal
  };

  // Función para abrir el modal de reporte
  const handleReportModalOpen = (multa) => {
    setSelectedMulta(multa);
    setShowReportModal(true);
  };

  // Función para cerrar el modal de reporte
  const handleReportModalClose = () => {
    setShowReportModal(false);
    setReportDescription(""); // Limpiar la descripción cuando se cierra el modal
    setReportValidationError(false); // Reiniciar el estado de validación
  };

  const handleReportSubmit = async () => {
    if (!reportDescription.trim()) {
      setReportValidationError(true);
      return;
    }
  
    const reportData = {
      nombre_agente: selectedMulta.nombre_agente,
      id_usuario: user?.user?.id,
      descripcion: reportDescription,
      verificado: false,
      id_multa: selectedMulta.id,
      fecha: new Date().toISOString(),
      tipo_reporte: tipoReport
    };
  
    try {
      const response = await axios.post('http://localhost:4000/createReporte', reportData);
      if (response.status === 201) {
        toast.success("Reporte enviado exitosamente.");
        handleReportModalClose();
        actualizarMultaUsuario();
      } else {
        toast.error("Error al enviar el reporte.");
      }
    } catch (error) {
      console.error("Error al enviar el reporte: ", error);
      toast.error("Error al enviar el reporte.");
    }
  };


 useEffect(() => {
    if (user?.user?.cedula) {
      fetchData(1);
    }
  }, [user?.user?.cedula]);

  const fetchData = async () => {
    try {
        // Asegúrate de que esta URL es correcta y apunta al endpoint que usa getMultasByCedulaWithAgentName
        const response = await axios.get(`http://localhost:4000/multasUser?cedula_usuario=${user.user.cedula}`);
        if (response.data?.multasDelUsuario) {
            setMultas(response.data.multasDelUsuario);
            console.log("trayendo las multas con nombres de agentes", response.data.multasDelUsuario);
        } else {
            toast.error("No se encontraron multas para este usuario.");
        }
        actualizarMultaUsuario();
    } catch (error) {
        console.error("Error trayendo los datos de las multas:", error);
        toast.error("Error al obtener los datos de las multas.");
    }
};


  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <>
      <div id="content">
        <div id="multas">
          <h3 className="fw-bold text-dark mb-4">ÚLTIMAS MULTAS </h3>
          <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
            <table className="table table-striped">
              <thead>
                <tr>
                  
                  <th className="fw-semibold" style={{ color: "white" }}>USUARIO</th>
                  <th className="fw-semibold" style={{ color: "white" }}>MATRÍCULA</th>
                  <th className="fw-semibold" style={{ color: "white" }}>PLACA</th>
                  <th className="fw-semibold" style={{ color: "white" }}>MOTIVO</th>
                  <th className="fw-semibold" style={{ color: "white" }}>MONTO</th>
                  <th className="fw-semibold" style={{ color: "white" }}>FECHA</th>
                  <th className="fw-semibold" style={{ color: "white" }}>ACCIÓN</th>
                  <th className="fw-semibold" style={{ color: "white" }}>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {multas.length > 0 ? (
                  multas.map((multa) => (
                    <tr key={multa.id}>
                      <td>{multa.nombre_multado}</td>
                      <td>{multa.matricula}</td>
                      <td>{multa.placa}</td>
                      <td>{multa.razon}</td>
                      <td>{multa.monto}</td>
                      <td>{multa.fecha}</td>
                      <td>
                        <div className="tooltip-container1">
                          <span className="text1" onClick={() => handleDetailsModalOpen(multa)}><i className="fa-solid fa-eye"></i></span>
                          <span className="tooltip1">Detalles</span>
                        </div>
                        <div className="tooltip-container1">
                          <span className="text1" onClick={() => handleReportModalOpen(multa)}><i className="fa-solid fa-envelopes-bulk"></i></span>
                          <span className="tooltip1">Reportar</span>
                        </div>
                        <div className="tooltip-container1">
                        <span className="text1" onClick={() => handlePayModalOpen(multa.monto, multa.id)}>
                          <i className="fa-solid fa-credit-card"></i>
                        </span>
                        <span className="tooltip1">Pagar</span>
                      </div>
                      </td>
                      <td><span className="estado" 
                      style={{ 
                        width: '60px',
                        backgroundColor: multa.estado === 'PAGADO' ? 'rgb(4, 131, 55)' : 'red',
                        color: multa.estado === 'PAGADO' ? 'white' : 'white', // Cambia el color del texto a blanco para mejorar la legibilidad
                        borderRadius: '5px' // Opcional: añade bordes redondeados para mejorar la estética
                      }}
                      >{multa.estado}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No hay multas disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      <Toaster />
      <Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
          <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Detalles de la multa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMulta && (
            <div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="fw-bold">CEDULA:</label>
                  <input type="text" className="form-control" value={selectedMulta.cedula_usuario} readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="fw-bold">NOMBRE:</label>
                  <input type="text" className="form-control" value={selectedMulta.nombre_multado} readOnly />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="fw-bold">PLACA</label>
                  <input type="text" className="form-control" value={selectedMulta.placa} readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="fw-bold">MATRÍCULA:</label>
                  <input type="text" className="form-control" value={selectedMulta.matricula} readOnly />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="fw-bold">MOTIVO:</label>
                  <input type="text" className="form-control" value={selectedMulta.razon} readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="fw-bold">MONTO:</label>
                  <input type="text" className="form-control" value={selectedMulta.monto} readOnly />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="fw-bold">FECHA:</label>
                  <input type="text" className="form-control" value={selectedMulta.fecha} readOnly />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label className="fw-bold">ESTADO:</label>
                  <input type="text" className="form-control" value={selectedMulta.estado} readOnly />
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

      <Modal show={showPayModal} onHide={handlePayModalClose}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
          <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Pago de multa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <PayPalButton
            amount={selectedMultaAmount} // Aquí deberías poner el monto de la multa
            // Tu Client ID de PayPal. Se recomienda almacenarlo de forma segura
            options={{
              clientId: "AeOCMQ9QDshmb8tEta7z2LddLPeMASsWfG8IrOZNopigrrVg8DwSmC8J_eWpIFRVlyBOXpYtdOthCdK6"
            }}
            onSuccess={(details, data) => {
              handlePaymentSuccess(details, selectedMultaId);
              // Opcional: cierra el modal de pago
              handlePayModalClose();
            }}
          />
        </Modal.Body>

      </Modal>
      {/* Modal para enviar reportes del usuario */}

      <Modal show={showReportModal} onHide={handleReportModalClose}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
          <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Reportar multa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedMulta && (
          <div className="justify-content-center text-center">
            <div className="row"> 
                <div className="col-md-6">
                <div className="form-group mb-3">
                
                  <select 
                    className="form-select" 
                    value={tipoReport} 
                    onChange={(e) => setTipoReport(e.target.value)} 
                    id="tipoReport" 
                    style={{ borderRadius: '10px', width: '400px', height: '40px' , marginLeft: '2px'}}
                  >
                  <optgroup label="Tipo de reporte">
                    <option value="">Selecciona un tipo de reporte</option>
                    <option value="Incidente">Incidente</option>
                    <option value="Abuso">Abuso</option>
                    <option value="Soborno">Soborno</option>
                    <option value="Opresion">Opresion</option>
                  </optgroup>
                </select>
                </div>
              </div>
              {/* Aquí el nombre del agente que le hizo la multa  */}
              <div className=" mb-3">
                <div className="form-group">
                  <label className="fw-bold">Nombre del agente</label>
                  <input type="text" className="form-control" value={selectedMulta.nombre_agente || 'No disponible'} readOnly />
                </div>
              </div>

              <div className=" mb-3">
                <div className="form-group">
                  <label className="fw-bold">Fecha</label>
                  <input type="text" className="form-control" value={selectedMulta.fecha} readOnly />
                </div>
              </div>
            </div>
            <div>
              <Form.Group controlId="reportDescription" className="mb-3">
                <Form.Label className="fw-bold">Descripción del Reporte:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  isInvalid={reportValidationError && !reportDescription.trim()}
                />
                <Form.Control.Feedback type="invalid">
                  La descripción es obligatoria.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>

        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleReportModalClose}>Cancelar</Button>
          <Button variant="primary" onClick={handleReportSubmit}>Enviar Reporte</Button>
        </Modal.Footer>
            
      </Modal>
    

    </>
  );
};



export default Ultimamult;