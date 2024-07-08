import React, { useState, useEffect } from "react";
import personaimg from "../../persona.jpg"
import carImage from "../../carroprovisionalMulta.jpg";
import "../../Css/adicciones.css";
import { useAuth } from "../../context/provider";

function DatosUse() {
    const { user } = useAuth();
    const [ nombre, setNombre ] = useState('nombre no encontrado');
    const [ cedula, setCedula ] = useState('cedula no encontrada');
    const [ telefono, setTelefono ] = useState('telefono no encontrado');
    const [ correo, setCorreo ] = useState('correo no encontrado');
    const [ fotoPerfil, setFotoPerfil ] = useState(personaimg);
    const [ fotoVehiculo, setFotoVehiculo ] = useState(carImage);
    const [ apellido, setApellido ] = useState('apellido no encontrado');

    useEffect(() => {
        if (user && user.user && user.user.nombre) {
            setNombre(user.user.nombre);
            setCedula(user.user.cedula);
            setTelefono(user.user.telefono);
            setCorreo(user.user.correo);
            setFotoPerfil(user.user.foto);
            setFotoVehiculo(user.user.foto_Vehiculo);
            setApellido(user.user.apellido);
        }
    })

    return (
        <>
            <div class="card-group">
                <div class="card shadow mb-3">
                    <div class="card-body">
                        <div className="card-header py-3">
                            <h4
                                class="card-title"
                                style={{ color: 'var(--bs-emphasis-color)' }}
                            >
                                Datos del Usuario
                            </h4>
                        </div>
                        <div class="card-body">
                            <form className='mt-4'>
                                <div className="row mb-3 multalist">
                                    <div className="col">
                                        <label className="form-label"><strong>Nombre:</strong></label>
                                        <p>{`${nombre} ${apellido}`}</p>
                                    </div>
                                    <div className="col">
                                        <label className="form-label"><strong>Cedula:</strong></label>
                                        <p>{cedula}</p>
                                    </div>
                                </div>
                                <div className="row mb-3 multalist">
                                    <div className="col">
                                        <label className="form-label"><strong>Telefono:</strong></label>
                                        <p>{telefono}</p>
                                    </div>
                                    <div className="col">
                                        <label className="form-label"><strong>Correo:</strong></label>
                                        <p>{correo}</p>
                                    </div>
                                </div>
                            </form>
                            <button
                                class="btn btn-primary mx-auto"
                                type="button"
                                style={{ background: 'rgb(4, 131, 55)', borderColor: 'rgb(4, 131, 55)' }}
                            >
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card shadow mb-3">
                    <div className="card-body bode1">
                        <div className='row justify-content-start'>
                            <div className='col-md-6 '>
                                <h4 className="card-title text-center" style={{ color: 'var(--bs-emphasis-color)', fontSize: '22px', width: '250px' }}>
                                    Foto de Perfil
                                </h4>
                                <img src={fotoPerfil} className="rounded" style={{ height: '200px', width: '250px' }} />
                            </div>

                            <div className='col-md-6 '>
                                <h4 className="card-title text-center" style={{ color: 'var(--bs-emphasis-color)', fontSize: '22px', width: '250px' }}>
                                    Foto del Vehículo
                                </h4>
                                <img src={fotoVehiculo} className="rounded" style={{ height: '200px', width: '250px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default DatosUse;