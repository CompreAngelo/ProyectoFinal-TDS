import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast';
import { Reloj } from "../Home";
import axios from 'axios';
import { useAuth } from "../../context/provider";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

function PerfilOtrosD() {
  const { user } = useAuth();
const [userContrasena, setUserContrasena] = useState("Contraseña no encontrada");
const [userTelefono, setUserTelefono] = useState("Teléfono no encontrado");
const [userSalario, setUserSalario] = useState("Salario no encontrado");
const [userID, setUserID] = useState("ID no encontrado");//tomo el id del contexto
const [showPassword, setShowPassword] = useState(false);

useEffect(() => {
 if (user && user.user && user.user.nombre) {
    setUserContrasena(user.user.contrasena);
    setUserTelefono(user.user.telefono);
    setUserSalario(user.user.salario);
    setUserID(user.user.id);
 }
}, [user]); // Asegúrate de incluir user como dependencia para que el efecto se ejecute cuando user cambie


  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    contrasenaAntigua: "",
    contrasenaNueva: "",
    contrasenaNuevaConfirmacion: "",
    telefono: "",
  });
  const [errors, setErrors] = useState({}); // Inicializar errors como un objeto vacío
  const [userData, setUserData] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpiar error al cambiar el valor
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setErrors({}); // Limpiar los errores al cerrar el modal
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
 };

 const getPlaceholderDots = (length) => {
  return '•'.repeat(length); 
};

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    // Validaciones
    const newErrors = {};
  
    if (formData.contrasenaNueva !== formData.contrasenaNuevaConfirmacion || formData.contrasenaAntigua === formData.contrasenaNueva) {
      newErrors.contrasena = "Las contraseñas no coinciden o son iguales.";
      setErrors(newErrors);
      toast.error(newErrors.contrasena);
      return; 
    }
  
    if (!/^[A-Z]/.test(formData.contrasenaNueva) || !/[!@#$%^&*(),.?":{}|<>]/.test(formData.contrasenaNueva)) {
      newErrors.contrasena = "La contraseñas deben comenzar con mayúscula y contener al menos un carácter especial.";
      setErrors(newErrors);
      toast.error(newErrors.contrasena);
      return; 
    }
  
    if (!/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = "El número de teléfono debe contener al menos 10 dígitos.";
      setErrors(newErrors);
      toast.error(newErrors.telefono);
      return; 
    }

    if(Object.keys(newErrors).length === 0) {
      try {
        // Preparar los datos para la actualización
        const updateData = {
          telefono: formData.telefono,
          contrasena: formData.contrasenaNueva,
        };
  
        // Realizar la solicitud POST para actualizar los datos del usuario
        const response = await axios.post(`http://localhost:4000/user/${userID}`, updateData); //mando el id del contexto al back
  
        if (response.status === 200) {
          console.log(response);
          toast.success("Los datos fueron actualizados exitosamente!");
          // Aquí puedes actualizar el estado del usuario en el frontend si es necesario
        } else {
          console.log('Error actualizando el usuario');
          toast.error("Se produjo un error al actualizar los datos del usuario");
        }
      } catch (error) {
        console.error('Error actualizando el usuario', error);
        toast.error("Se produjo un error al actualizar los datos del usuario");
      }
   }
  };
  
  return (
    <>
      <Toaster />

      <div className="card shadow mb-3">
        <div className="card-header py-3">
          <p className="text-success m-0 fw-bold">Datos Adicionales</p>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              {/* <label className="form-label" htmlFor="contrasena">
                <strong>Contraseña</strong>
              </label>
              <input
                className="form-control"
                type="password"
                id="contrasena"
                placeholder={showPassword ? userContrasena: getPlaceholderDots(userContrasena.length)}
                name="contrasena"
                value={formData.contrasenaNuevaConfirmacion}
                onChange={handleInputChange}
                readOnly
              />
              <Icon
               icon={showPassword ? eyeOff : eye}
               onClick={toggleShowPassword}
                style={{ cursor: 'pointer', position: 'absolute', right: '30px', top:"110px"}}
               /> */}
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="telefono">
                    <strong>Número de teléfono</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="telefono"
                    placeholder={userTelefono}
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    readOnly
                  />
                  {errors && errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                </div>
              </div>
              <div className="col">
                <div className="mb-3">
                  <label className="form-label" htmlFor="salario">
                    <strong>Salario</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="salario"
                    placeholder={userSalario}
                    name="salario"
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
            <Button className="Button2" onClick={handleModalOpen}>
              Editar Datos Personales
            </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="col-md-12">
        
          <Reloj fullWidth={true} /> {/* Aquí se pasa la propiedad fullWidth como true */}

      </div>

      {/* Modal para la edición de datos personales */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton style={{ background: '#19ab54', color: 'white', borderBottom: 'none' }}>
            <Modal.Title style={{ fontWeight: 'bold', textAlign: 'center', width: '100%', margin: '0 auto' }}>Detalles del agente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              {/* <Form.Label>Contraseña Antigua:</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                name="contrasenaAntigua"
                placeholder={showPassword ? userContrasena: getPlaceholderDots(userContrasena.length)}
                readOnly
              />
              <Icon
               icon={showPassword ? eyeOff : eye}
               onClick={toggleShowPassword}
                style={{ cursor: 'pointer', position: 'absolute', right: '30px', top:"53px"}}
               /> */}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña Nueva:</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                name="contrasenaNueva"
                value={formData.contrasenaNueva}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirmar Contraseña:</Form.Label>
              <Form.Control
                className="form-control"
                type="password"
                name="contrasenaNuevaConfirmacion"
                value={formData.contrasenaNuevaConfirmacion}
                onChange={handleInputChange}
              />
              {errors && errors.contrasena && <Form.Control.Feedback type="invalid">{errors.contrasena}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Número de teléfono:</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
              {errors && errors.telefono && <Form.Control.Feedback type="invalid">{errors.telefono}</Form.Control.Feedback>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cerrar
          </Button>
          <Button className="Button2" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PerfilOtrosD;
