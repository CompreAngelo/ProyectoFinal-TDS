import React, { useEffect } from "react";
import NmRazon from "./nuevamultaRazones";
import { toast } from 'react-hot-toast';
import useLocalStorage from "../../helpers/localStorage"; // Asegúrate de importar el Hook correctamente

function NmOtroCon({ onFormDataChange }) {
    const [selectedRazon, setSelectedRazon] = useLocalStorage('selectedRazon', '');
    const [monto, setMonto] = useLocalStorage('monto', 'RD$0.00');

    const handleRazonChange = (event) => {
        const razonSeleccionada = event.target.value;
        setSelectedRazon(razonSeleccionada);
    };

    useEffect(() => {
        switch (selectedRazon) {
            case 'Sin licencia (ART 29)':
                setMonto('RD$1,000.00');
                break;
            case 'Licencia vencida (ART 40-41)':
                setMonto('RD$1,000.00');
                break;
            case 'No portar licencia (ART 47-7)':
                setMonto('RD$1,000.00');
                break;
            case 'Sin marbete de seguro (ART 146/02)':
                setMonto('RD$1,000.00');
                break;
            case 'Sin matrícula (ART 27-3)':
                setMonto('RD$1,000.00');
                break;
            case 'Sin placa (ART 27-4)':
                setMonto('RD$1,000.00');
                break;
            case 'Sin revista (art 110)':
                setMonto('RD$1,000.00');
                break;
            case 'Sin tablilla (ART 1 LEY513)':
                setMonto('RD$1,000.00');
                break;
            case 'Sin casco (ART 135C)':
                setMonto('RD$1,000.00');
                break;
            case 'Pirata no rotuló (ART 33-77)':
                setMonto('RD$1,000.00');
                break;
            case 'Obstrucción al tránsito (ART 88)':
                setMonto('RD$1,000.00');
                break;
            case 'Sitio (zona) prohibido (ART 81)':
                setMonto('RD$1,000.00');
                break;
            case 'Señales de tránsito (ART 97)':
                setMonto('RD$1,000.00');
                break;
            case 'Violar señal de pare (ART 97-A)':
                setMonto('RD$1,000.00');
                break;
            case 'Viraje en u (ART 76-C)':
                setMonto('RD$1,000.00');
                break;
            case 'Una placa 8(ART 27-22)':
                setMonto('RD$1,000.00');
                break;
            case 'Uso distinto de matricula (ART 27-2)':
                setMonto('RD$1,000.00');
                break;
            case 'Color distinto de matricula (ART 27-27)':
                setMonto('RD$1,000.00');
                break;
            case 'Personas sobre la carga (ART 174)':
                setMonto('RD$1,000.00');
                break;
            case 'Ruido (ART 162)':
                setMonto('RD$1,000.00');
                break;
            case 'Ceder paso vehículo emergencia (ART 74-H)':
                setMonto('RD$1,000.00');
                break;
            case 'No exhibir la placa en su lugar (ART 27-4)':
                setMonto('RD$1,000.00');
                break;
            case 'Luz delantera apagada (ART 144)':
                setMonto('RD$1,000.00');
                break;
            case 'Luz trasera (ART 145)':
                setMonto('RD$1,000.00');
                break;
            case 'Espejo retrovisor (ART 158)':
                setMonto('RD$1,000.00');
                break;
            case 'Extinguidor (ART 164-B)':
                setMonto('RD$1,000.00');
                break;
            case 'Botiquín (ART 164 AP 200)':
                setMonto('RD$1,000.00');
                break;
            case 'Bandera roja (ART 171 A-3)':
                setMonto('RD$1,000.00');
                break;
            case 'Plataforma y timbre (ART 173-G)':
                setMonto('RD$1,000.00');
                break;
            case 'Peón (ART 173-D)':
                setMonto('RD$1,000.00');
                break;
            case 'Expiración permiso extranjero':
                setMonto('RD$1,000.00');
                break;
            case 'Triángulo (ART 164-D)':
                setMonto('RD$1,000.00');
                break;
            case 'Placa exhibición vencida':
                setMonto('RD$1,000.00');
                break;
            case 'Ventas vías publicas (ART 130 LEY 241)':
                setMonto('RD$1,000.00');
                break;
            case 'Lanzar desperdicios en vías publicas (ART 130)':
                setMonto('RD$1,000.00');
                break;
            case 'Velocidad muy reducida (ART 62)':
                setMonto('RD$1,000.00');
                break;
            case 'Guía a la izquierda (ART 5)':
                setMonto('RD$1,000.00');
                break;
            case 'Actos prohibidos (ART 27 Y 47)':
                setMonto('RD$1,000.00');
                break;
            case 'Multas anteriores 530.00':
                setMonto('RD$530.00');
                break;
            case 'Multas anteriores 884.00':
                setMonto('RD$884.00');
                break;
            case 'Sin cinturón (ART 161)':
                setMonto('RD$1,667.00');
                break;
            case 'Luz roja (ART 96-B-1)':
                setMonto('RD$1,667.00');
                break;
            case 'Uso del celular (ART 1 ley 143-01)':
                setMonto('RD$1,667.00');
                break;
            case 'Niños menores en el asiento delantero (ART 106)':
                setMonto('RD$1,667.00');
                break;
            
            // Agrega más casos según tus necesidades
            default:
                setMonto('RD$0.00');
        }

    }, [selectedRazon]);

    const handleSaveToLocal = () => {
        // Validación: verifica si la razón seleccionada está vacía
        if (!selectedRazon) {
            toast.error('Por favor, seleccione una razón.'); // Muestra un mensaje de error con toast
            return;
        }
    
        const formData = {
            razon: selectedRazon,
            monto: monto,
        };
        console.log("Guardando en local:", formData); // Depuración
        onFormDataChange(formData);
    };
    const resetValues = () => {
        setSelectedRazon('');
        setMonto('RD$0.00');
    };
    
    useEffect(() => {
        return () => {
            resetValues();
        };
    }, []);

    return (
        <>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-success m-0 fw-bold">Otros detalles</p>
                </div>
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="reason"><strong>Razón</strong></label>
                            <select className="form-select" id="reason" name="reason" onChange={handleRazonChange}>
                                <NmRazon />
                            </select>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="city"><strong>Monto</strong></label>
                                    <input className="form-control" type="text" id="city" value={monto} disabled />
                                </div>
                            </div>
                            <div className="col"></div>
                        </div>
                        <div className="mb-3">
                            <button className="Button2" type="button" onClick={handleSaveToLocal}>Guardar configuracion</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default NmOtroCon;