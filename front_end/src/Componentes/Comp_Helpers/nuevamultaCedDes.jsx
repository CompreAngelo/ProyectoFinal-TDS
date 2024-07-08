import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../context/provider.jsx';
import { toast } from 'react-hot-toast';
import NmDatosCon from "./nuevamultaDatosContainer.jsx";
import carImage from "../../carroprovisionalMulta.jpg";
import "../../Css/nuevamulta.css";

function NmCedDes({ setNombre, setCedula }) {
    const [cedula, setCedulaState] = useState("");
    const { multa } = useAuth();
    const [historialMultas, setHistorialMultas] = useState([]);

    useEffect(() => {
        setCedulaState(multa?.cedula_usuario || "");
        // Asegurarse de que multa sea un array antes de asignarlo a historialMultas
        setHistorialMultas(Array.isArray(multa?.multasDelAgente) ? multa?.multasDelAgente : []);
    }, [multa]);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cedulaValue = e.target.value;

            // Validación: verifica si la cédula está vacía
            if (!cedulaValue) {
                toast.error('Por favor, ingrese una cédula.');
                return;
            }

            // Validación: verifica si la cédula cumple con un patrón específico
            // Este es un ejemplo, ajusta el patrón según tus necesidades
            const cedulaPattern = /^\d{11}$/; // Patrón de ejemplo para  10 dígitos
            if (!cedulaPattern.test(cedulaValue)) {
                toast.error('La cédula ingresada no es válida.');
                return;
            }

            try {
                const response = await axios.post('http://localhost:4000/getUserNameByCedula', { cedula: cedulaValue });
                setNombre(response.data.nombre);
                setCedula(cedulaValue);
            } catch (error) {
                console.error('Error al obtener el nombre del usuario:', error);
                toast.error('Hubo un error al obtener el nombre del usuario.');
            }
        }
    };

    return (
        <>
            <div className="col-lg-4">
                <div className="card mb-3"></div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="text-success fw-bold m-0">Cédula</h6>
                    </div>
                    <div className="card-body">
                    <input
                            className="form-control"
                            type="text"
                            id="cedula"
                            placeholder="Cédula"
                            name="cedula"
                            value={cedula}
                            onChange={(e) => setCedulaState(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="text-success fw-bold m-0">Vehículo</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-auto d-flex justify-content-center align-items-center imagencontainer" style={{ minHeight: '150px' }}>
                                {carImage ? (
                                    <img src={carImage} alt="Carro" className="imagenfoto" />
                                ) : (
                                    <span>No hay foto disponible</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="multa-card">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="fs-6 fw-bolder text-success card-title mb-3">Historial</h4>
                            <div className="multas-wrapper">
                                <div className="multas-scroll">
                                    <div className="multas">
                                    {historialMultas
                                            .filter((m) => m.id_angente === multa?.id_angente) // Filtrar por ID del agente
                                            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)) // Ordenar por fecha, más reciente primero
                                            .slice(0, 3) // Obtener las últimas 3 multas
                                            .map((m, index) => (
                                                <div key={index} className="mb-4 multa-card">
                                                    <h6 className="fs-6 fw-bolder text-success mb-3">Multa #{index + 1}</h6>
                                                    <div className="razon">
                                                        <strong>Razón:</strong> {m.razon}
                                                    </div>
                                                    <div className="monto">
                                                        <strong>Monto:</strong> ${m.monto}
                                                    </div>
                                                    <div className="cedula-usuario">
                                                        <strong>Cédula del conductor:</strong> {m.cedula_usuario}
                                                    </div>
                                                    <div className="matricula">
                                                        <strong>Matricular:</strong> {m.matricula}
                                                    </div>
                                                    <div className="fecha">
                                                        <strong>Fecha:</strong> {m.fecha}
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NmCedDes;
