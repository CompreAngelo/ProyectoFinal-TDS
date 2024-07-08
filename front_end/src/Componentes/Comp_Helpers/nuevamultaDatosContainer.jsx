import React from "react";

function NmDatosCon({ nombre, placa, matricula, vehiculo, setMatricula, setPlaca, setFecha, handleFormSubmit  }) {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "nombre":
                // No hay necesidad de actualizar 'nombre' aquí porque se pasa como una prop y es de solo lectura
                break;
            case "placa":
                setPlaca(value);
                break;
            case "matricula":
                setMatricula(value);
                break;
            case "vehiculo":
                // No hay necesidad de actualizar 'vehiculo' aquí porque se pasa como una prop y es de solo lectura
                break;
            default:
                break;
        }
    };
    const handleFormSubmitWrapper = (event) => {
        event.preventDefault(); // Prevenir la recarga de página
        handleFormSubmit(); // Llamar a la función pasada como propiedad
    };


    return (
        <>
            <div className="card shadow mb-3">
                <div className="card-header py-3">
                    <p className="text-success m-0 fw-bold">Datos</p>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="username"><strong>Nombre</strong></label>
                                    <input className="form-control" type="text" id="username" placeholder="Nombre" name="nombre" value={nombre} onChange={handleInputChange} readOnly />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="placa"><strong>Placa</strong></label>
                                    <input className="form-control" type="text" id="placa" placeholder="Placa" name="placa" value={placa} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="matricula"><strong>Matrícula</strong></label>
                                    <input className="form-control" type="text" id="matricula" placeholder="Matrícula" name="matricula" value={matricula} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="vehiculo"><strong>Vehículo</strong></label>
                                    <input className="form-control" type="text" id="vehiculo" placeholder="Vehículo" name="vehiculo" value={vehiculo} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div class="mb-3"><button class="Button2" type="submit" onClick={(e) => handleFormSubmit(e)}>Guardar</button></div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default NmDatosCon;
