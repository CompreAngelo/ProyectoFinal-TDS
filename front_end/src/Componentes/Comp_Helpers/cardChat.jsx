import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Picker from 'emoji-picker-react'
import "../../Css/chat.css"
import { useAuth } from '../../context/provider.jsx';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import toast, { Toaster } from 'react-hot-toast';

import 'leaflet-geosearch/assets/css/leaflet.css';
import FormEmerg from './FormEmerg.jsx';
const socket = io('http://localhost:5000');

function ChatClient() {
    const { user, messages, addMessage } = useAuth();
    const [userNombre, setUserNombre] = useState('Usuario no encontrado');
    const [messageInput, setMessageInput] = useState('');
    const [selectedOption, setSelectedOption] = useState('1');

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
    }, [userNombre, addMessage]); // Removido 'messages' de las dependencias

    const sendMessage = () => {
        const newMessage = {
            text: messageInput,
            color: getMessageBackgroundColor(),
            time: new Date(),
            user: userNombre
        };

        newMessage.latitud = clickedCoords ? clickedCoords.lat.toFixed(6) : '';
        newMessage.longitud = clickedCoords ? clickedCoords.lng.toFixed(6) : '';

        addMessage(newMessage);
        setMessageInput('');
    
        socket.emit('message', newMessage);
    };

    /*mapa*/

    const [map, setMap] = useState(null);
    const { requerimiento } = useAuth();
    const [userLocation, setUserLocation] = useState(null);
    const [clickedCoords, setClickedCoords] = useState(null);
  
    
    useEffect(() => {
      let newMap;
  
      const initMap = async () => {
        if (newMap) {
          return;
        }
  
        try {
          const position = await getCurrentLocation();
          setUserLocation(position.coords);
  
          newMap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(newMap);
          setMap(newMap);
  
          // Después de inicializar el mapa
          const provider = new OpenStreetMapProvider();
          const searchControl = new GeoSearchControl({
            provider: provider,
            autoComplete: true,
            autoCompleteDelay: 250,
            showMarker: true,
          });
  
          newMap.addControl(searchControl);
  
          // Crear círculo de ubicación del usuario
          const userCircle = L.circle([position.coords.latitude, position.coords.longitude], {
            color: 'green',
            fillColor: 'green',
            fillOpacity: 0.5,
            radius: 32,
          }).addTo(newMap);
          userCircle.bindPopup("Tu ubicación actual");
  
          // Agregar círculos para los requerimientos
          if (requerimiento && requerimiento.requerimientos) {
            requerimiento.requerimientos.forEach((req) => {
              const { latitud, longitud, direccion, fecha, requerimiento, nivel } = req;
  
              // Definir el color del círculo según el nivel
              let color;
              switch (nivel) {
                case 1:
                  color = 'yellow';
                  break;
                case 2:
                  color = 'orange';
                  break;
                case 3:
                  color = 'red';
                  break;
                default:
                  color = 'blue'; // Color predeterminado para otros casos
              }
  
              // Crear un círculo con el color determinado
              const reqCircle = L.circle([latitud, longitud], {
                color: color,
                fillColor: color,
                fillOpacity: 0.5,
                radius: 300,
              }).addTo(newMap);
  
              reqCircle.bindPopup(`<b> Lugar: ${direccion}</b><br> Fecha: ${fecha}<br> Requerimiento: ${requerimiento}`);
            });
          } const onMapClick = (e) => {
            setClickedCoords(e.latlng);
          };
          newMap.on('click', onMapClick);
        } catch (error) {
          console.error('Error al obtener la ubicación del usuario', error);
          toast.error('No se pudo obtener la ubicación del usuario.');
        }
      };
  
      initMap();
  
      // Limpiar el mapa al desmontar el componente
      return () => {
        if (newMap) {
          newMap.remove();
        }
      };
    }, [requerimiento]);
  
    const getCurrentLocation = () => {
      return new Promise((resolve, reject) => {
        const options = {
          enableHighAccuracy: true,
          maximumAge: 60000, // 60 segundos
          timeout: 20000,
        };
  
        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            reject(`Error al obtener la ubicación del usuario: ${error.message}`);
          },
          options
        );
      });
      
    };

    return (
        <>
        <div className="col-md-6" style={{ height: '400px', position: 'relative' }} id="map">
              <div className='lati'>
              {clickedCoords && (
                  <div>
                    <p className='leaflet-control-coordinates leaflet-control'>
                      Lat: {clickedCoords.lat.toFixed(6)} Long: {clickedCoords.lng.toFixed(6)}
                    </p>
                  </div>
              )}
            </div>
          </div>

        <div className='col-md-6'>
          <FormEmerg latitud={clickedCoords ? clickedCoords.lat.toFixed(6) : ''} longitud={clickedCoords ? clickedCoords.lng.toFixed(6) : ''}/>
        </div>
        {/*<div className="col-md-6">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="text-success fw-bold m-0">Crear Notificacion</h6>
                </div>
                <ul className="list-group list-group-flush ul-chat chat-container">
                    <div className='contenedor-padre'>
                    {messages.map((message, index) => (
                            <div key={index} className="message-container">
                                <span className="name-user">
                                    {userNombre}
                                    </span>
                                <li className="message-item" style={{ backgroundColor: message.color, color: 'white' }}>
                                    {message.text}
                                    {message.time &&
                                        <span className="message-time">
                                            {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                                        </span>
                                    }
                                </li>
                            </div>
                        ))}
                    </div>
                    <div className='chat-container'>
                        <div className="messageBox">
                            <div className="fileUploadWrapper">
                                <div className="select1">
                                    <select onChange={(e) => setSelectedOption(e.target.value)}>
                                        <option value="1">Emergencias</option>
                                        <option value="2">Clase A</option>
                                        <option value="3">Clase B</option>
                                        <option value="4">Clase C</option>
                                    </select>
                                </div>
                            </div>
                            <input
                                required=""
                                placeholder="Message..."
                                type="text"
                                id="messageInput"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                            />
                            <button onClick={sendMessage} id="sendButton">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                                    <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </ul>
                                  </div>
        </div>*/}
        </>
    );
}

export default ChatClient;