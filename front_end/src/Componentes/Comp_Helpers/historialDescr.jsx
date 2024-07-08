import React, { useState, useEffect } from "react";
import '../../Css/historial.css'
import { useAuth } from '../../context/provider.jsx';

function HisDescr() {
    const [cedula, setCedulaState] = useState("");
    const { multa } = useAuth();
    const [historialMultas, setHistorialMultas] = useState([]);
    const [multaSeleccionada, setMultaSeleccionada] = useState(null);

    useEffect(() => {
        setCedulaState(multa?.cedula_usuario || "");
        // Asegurarse de que multa sea un array antes de asignarlo a historialMultas
        setHistorialMultas(Array.isArray(multa?.multasDelAgente) ? multa?.multasDelAgente : []);
    }, [multa]);

    const totalMultas = historialMultas.length;

    return (
        <>
            <div className="col-lg-4">
                <div className="card mb-3"></div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="text-success fw-bold m-0">Total de Multas</h6>
                    </div>
                    <div className="card-body d-flex flex-column align-items-center">
                        {/* Icono atractivo */}
                        <lord-icon
                            src="https://cdn.lordicon.com/vistbkts.json"
                            trigger="hover"
                            colors="primary:#858796,secondary:#08a88a"
                            style={{ width: "150px", height: "150px" }}
                        ></lord-icon>
                        {/* Texto con el total de multas */}
                        <span className="total-multas-count">{totalMultas}</span>
                    </div>
                </div>
            </div>


            <div class="col-lg-8">
                <div class="row">
                    <div class="col">
                        <div class="card shadow mb-3">
                            <div class="card-header py-3">
                                <p class="text-success m-0 fw-bold">Descripción</p>
                            </div>
                            <div class="card-body">
                                {multaSeleccionada ? (
                                    
                                    <form>
                                        {/* Aquí va el contenido del formulario con los detalles de la multa seleccionada */}
                                    </form>
                                ) : (
                                    <div className="text-center">Seleccione una multa para ver los detalles.</div>
                                )}

                                {multaSeleccionada && (
                                    
                                    <form className={`mt-4 detalles-form ${multaSeleccionada ? 'mostrar ' : ''}`}>
                                        <div className="row mb-3 multalist">
                                            <div className="col">
                                                <label className="form-label"><strong>Cédula del Conductor:</strong></label>
                                                <p>{multaSeleccionada.cedula_usuario}</p>
                                            </div>
                                            <div className="col">
                                                <label className="form-label"><strong>Matrícula:</strong></label>
                                                <p>{multaSeleccionada.matricula}</p>
                                            </div>
                                        </div>
                                        <div className="row mb-3 multalist">
                                            <div className="col">
                                                <label className="form-label"><strong>Razón:</strong></label>
                                                <p>{multaSeleccionada.razon}</p>
                                            </div>
                                            <div className="col">
                                                <label className="form-label"><strong>Monto:</strong></label>
                                                <p>{multaSeleccionada.monto}</p>
                                            </div>
                                        </div>
                                        <div className="row mb-3 multalist">
                                            <div className="col">
                                                <label className="form-label"><strong>Fecha:</strong></label>
                                                <p>{multaSeleccionada.fecha}</p>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card shadow">
                    <div className="card-header py-3">
                        <p className="text-success m-0 fw-bold">Multas Previas</p>
                    </div>
                    <div className="card-body" style={{ overflowY: 'auto', maxHeight: '400px' }}>
                        {historialMultas
                            .filter((m) => m.id_angente === multa?.id_angente) // Filtrar por ID del agente
                            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha, más reciente primero
                            .map((m, index) => (
                                <div key={index} className="mb-4 multa-card multalist">
                                    <h6 className="fs-6 fw-bolder text-success mb-3">Multa #{index + 1}</h6>
                                    <button
                                        className="btn btn-success btn-sm link-light detalles-btn botonmulta"
                                        onClick={() => setMultaSeleccionada(multaSeleccionada === m ? null : m)}
                                    >
                                        Detalles
                                    </button>
                                    <div className="razon">
                                        <strong>Razón:</strong> {m.razon}
                                    </div>
                                    <div className="cedula-usuario">
                                        <strong>Cédula del conductor:</strong> {m.cedula_usuario}
                                    </div>
                                </div>
                            ))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default HisDescr;