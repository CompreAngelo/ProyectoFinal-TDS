import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/provider.jsx';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function FormEmerg({ latitud: propLatitud, longitud: propLongitud }) {
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [latitudForm, setLatitudForm] = useState('');
    const [longitudForm, setLongitudForm] = useState('');
    const [direccion, setDireccion] = useState('');
    const [detalles, setDetalles] = useState('');
    const [requerimiento, setRequerimiento] = useState('');
    const [fecha, setFecha] = useState('');
    const [nivel, setNivel] = useState(1);
    const [error, setError] = useState('');
    const { user, messages, addMessage  } = useAuth();
    const [id_agente, setIdAgente] = useState("id del agente no encontrado");
    const [userNombre, setUserNombre] = useState('Usuario no encontrado');
    const [selectedOption, setSelectedOption] = useState('1');

    useEffect(() => {
        setLatitud(propLatitud);
        setLongitud(propLongitud);
    }, [propLatitud, propLongitud]);

     const getMessageBackgroundColor = () => {
        switch (selectedOption) {
            case '2':
                return 'red';
            case '3':
                return '#9d9d00';
            case '4':
                return 'blue';
            default:
                return 'rgb(28, 200, 138)';
        }
    };

    useEffect(() => {
        if (user && user.user && user.user.nombre) {
            setUserNombre(user.user.nombre);
        }
    }, [user]); 

    useEffect(() => {
        const messageListener = (message) => {
            console.log('Mensaje recibido:', message);
            if (typeof message === 'object' && message.text && message.time) {
                message.user = userNombre;

                addMessage(message);
            }
        };

        socket.on('message', messageListener);

        return () => {
            socket.off('message', messageListener);
        };
    }, [userNombre, addMessage]);

    const sendMessage = () => {
        const newMessage = {
            text: detalles,
            color: getMessageBackgroundColor(),
            time: new Date(),
            user: userNombre,
            latitud: latitud,
            longitud: longitud,
            direccion: direccion,
            detalles: detalles,
            requerimiento: requerimiento,
            fecha: fecha,
            nivel: nivel
        };
    
        // Emitir el mensaje a través de socket.io
        socket.emit('message', newMessage);
    
        // Limpia el input del mensaje
        setDetalles('');
        setDireccion('');
        setRequerimiento('');
        setFecha('');
        setLatitud('');
        setLongitud('');
    };
    
    useEffect(() => {
        if (user && user.user && user.user.nombre) {
            setIdAgente(user.user.id);
            console.log("ID del agente:", user.user.id); // Agrega esta línea
        }
    }, [user]);    


    const handleSubmit = async () => {
        // Realizar validaciones
        if (!direccion.trim() || !detalles.trim() || !requerimiento.trim() || !fecha.trim() || !nivel || !latitud.trim() || !longitud.trim()){
            toast.error('Todos los campos son requeridos');
            return;
        }
        // Si todas las validaciones pasan, reseteamos el estado de error
    
        // Aquí puedes enviar los datos a donde sea necesario, como una API o un componente padre
        try {
            const response = await axios.post('http://localhost:4000/createrequerimiento', {
                id_agente,
                latitud,
                longitud,
                direccion,
                requerimiento,
                fecha,
                nivel
            });
            toast.success('Requerimiento creado exitosamente');
        } catch (error) {
            toast.error('Hubo un error al crear el requerimiento');
        }
    };
    
    const handleButtonClick = (event) => {
        event.preventDefault();
        sendMessage(); // Llama a la función sendMessage
        handleSubmit(); // Llama a handleSubmit sin necesidad de un evento
    };    
    

    return (
        <>
            <Toaster
                toastOptions={{
                    style: {
                        height: '90px',
                        width: '300px',
                        fontSize: '16px',
                    },
                }}
            />
            <div className="container d-flex justify-content-center align-items-center vh-50">
                <div className="card shadow mb-4">
                    <div className="card-header py-3">
                        <h6 className="text-success fw-bold m-0">Agrega un requerimiento</h6>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-auto d-flex justify-content-center align-items-center">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="latitud"><strong>Latitud</strong></label>
                                                <input className="form-control" type="text" id="latitud" placeholder="Latitud" name="latitud" value={latitud} readOnly />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="longitud"><strong>Longitud</strong></label>
                                                <input className="form-control" type="text" id="longitud" placeholder="Longitud" name="longitud" value={longitud} readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="direccion"><strong>Dirección</strong></label>
                                                <input className="form-control" type="text" id="direccion" placeholder="Dirección" name="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="detalles"><strong>Detalles</strong></label>
                                                <input className="form-control" type="text" id="detalles" placeholder="Detalles" name="detalles" value={detalles} onChange={(e) => setDetalles(e.target.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="requerimiento"><strong>Requerimiento</strong></label>
                                                <input className="form-control" type="text" id="requerimiento" placeholder="Requerimiento" name="requerimiento" value={requerimiento} onChange={(e) => setRequerimiento(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="fecha"><strong>Fecha</strong></label>
                                                <input className="form-control" type="text" id="fecha" placeholder="Fecha" name="fecha" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="nivel"><strong>Nivel</strong></label>
                                                <select className="form-select" id="nivel" name="nivel" value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                                                    <option value="3">1</option>
                                                    <option value="1">2</option>
                                                    <option value="2">3</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                    <button className="btn btn-success btn-sm link-light float-end" onClick={handleButtonClick}>Guardar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FormEmerg;