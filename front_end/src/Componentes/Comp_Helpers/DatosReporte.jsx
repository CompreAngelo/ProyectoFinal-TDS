import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

function DatosReport() {
  // Estados para almacenar los valores de los inputs
  const [tipoIncidente, setTipoIncidente] = useState("");
  const [nombreAgente, setNombreAgente] = useState("");
  const [fechaIncidente, setFechaIncidente] = useState("");
  const [horaIncidente, setHoraIncidente] = useState("");
  const [ubicacionIncidente, setUbicacionIncidente] = useState("");
  const [descripcionIncidente, setDescripcionIncidente] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación de que todos los campos están completos
    if (!tipoIncidente || !nombreAgente || !fechaIncidente || !horaIncidente || !ubicacionIncidente || !descripcionIncidente) {
      toast.error('Por favor completa todos los campos');
      return;
    }
    // Simular envío exitoso y mostrar notificación de éxito
    setTimeout(() => {
      // Reiniciar todos los estados a su valor inicial
      setTipoIncidente("");
      setNombreAgente("");
      setFechaIncidente("");
      setHoraIncidente("");
      setUbicacionIncidente("");
      setDescripcionIncidente("");
      toast.success('Reporte enviado exitosamente');
    }, 2000);
  };

  return (
    <div className="container">
      <div className="card shadow-lg o-hidden border-0 my-5" style={{ background: 'rgb(0, 104, 56)' }}>
        <div className="p-5">
          <div className="text-center">
            <h4 className="mb-4" style={{ color: 'var(--bs-body-bg)' }}>Reportar Agente</h4>
          </div>
          <form className="user" onSubmit={handleSubmit}>
            {/* Input para seleccionar el tipo de incidente */}
            <div className="mb-3">
              <select 
                className="form-select" 
                value={tipoIncidente} 
                onChange={(e) => setTipoIncidente(e.target.value)} 
                id="tipoIncidente" 
                style={{ borderRadius: '10px', width: '300px', height: '40px' , marginLeft: '2px'}}>
                <optgroup label="Tipo de reporte">
                  <option value="">Selecciona un tipo de reporte</option>
                  <option value="Incidente">Incidente</option>
                  <option value="Queja">Queja</option>
                  <option value="Sugerencia">Sugerencia</option>
                </optgroup>
              </select>
            </div>

            {/* Input para ingresar el nombre del agente */}
            <div className="mb-3">
              <input 
                className="form-control form-control-user" 
                value={nombreAgente} 
                onChange={(e) => setNombreAgente(e.target.value)} 
                type="text" 
                id="nombreAgente" 
                placeholder="Nombre del agente" 
                name="first_name" 
                style={{ borderRadius: '10px', width: '300px', height: '40px' }} />
            </div>

            {/* Input para ingresar la fecha del incidente */}
            <div className="mb-3">
              <input 
                className="form-control form-control-user" 
                value={fechaIncidente} 
                onChange={(e) => setFechaIncidente(e.target.value)} 
                type="date" 
                id="fechaIncidente" 
                aria-describedby="emailHelp" 
                placeholder="Fecha del incidente" 
                name="email" 
                style={{ borderRadius: '10px', width: '300px', height: '40px' }} />
            </div>

            {/* Input para ingresar la hora del incidente */}
            <div className="mb-3">
              <input 
                className="form-control form-control-user" 
                value={horaIncidente} 
                onChange={(e) => setHoraIncidente(e.target.value)} 
                type="time" 
                id="horaIncidente" 
                style={{ borderRadius: '10px', width: '300px', height: '40px' }} />
            </div>

            {/* Input para ingresar la ubicación del incidente */}
            <div className="mb-3">
              <input 
                className="form-control form-control-user" 
                value={ubicacionIncidente} 
                onChange={(e) => setUbicacionIncidente(e.target.value)} 
                type="text" 
                id="ubicacionIncidente" 
                placeholder="Ubicación" 
                style={{ borderRadius: '10px', width: '300px', height: '40px' }} />
            </div>

            {/* Input para ingresar la descripción del incidente */}
            <div className="mb-3">
              <textarea 
                className="form-control" 
                value={descripcionIncidente} 
                onChange={(e) => setDescripcionIncidente(e.target.value)} 
                id="descripcionIncidente" 
                placeholder="Descripción del incidente" 
                style={{ borderRadius: '10px', width: '300px', height: 'auto' }}>
              </textarea>
            </div>

            {/* Botón para enviar el reporte */}
            <button 
              className="btn btn-primary d-block btn-user w-100" 
              type="submit" 
              style={{ background: '#008c3e', borderColor: '#008c3e', borderRadius: '10px' }}>
              Enviar Reporte
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default DatosReport;
