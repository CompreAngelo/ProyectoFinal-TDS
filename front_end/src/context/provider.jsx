import React, { useContext, useState } from 'react';
import Context from "./context";
import axios from 'axios';

export const Provider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [multaUsuario, setMultaUsuario] = useState([]);

  const [multa, setMulta] = useState(() => {
    const storedMulta = localStorage.getItem('multa');
    return storedMulta ? JSON.parse(storedMulta) : null;
  });
  const [requerimiento, setRequerimiento] = useState(() => {
    const storedRequerimiento = localStorage.getItem('requerimiento');
    return storedRequerimiento ? JSON.parse(storedRequerimiento) : null;
  });
  const [Agente, setAgente] = useState(() => {
    const storedRequerimiento = localStorage.getItem('Agente');
    return storedRequerimiento ? JSON.parse(storedRequerimiento) : null;
  });
  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const cargarRequerimientos = (requerimientoData) => {
    setRequerimiento(requerimientoData);
    localStorage.setItem('requerimiento', JSON.stringify(requerimientoData));
  };

  const cargarMultas = (multasData) => {
    setMulta(multasData); 
    localStorage.setItem('multa', JSON.stringify(multasData)); 
  };
  
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const addMessage = (message) => {
    const newMessages = [...messages, message];
    setMessages(newMessages);
    localStorage.setItem('messages', JSON.stringify(newMessages));
  };

  
  const actualizarMulta = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser.user.id);
      if (parsedUser.user.id) {
        const multaResponse = await axios.post('http://localhost:4000/multaAgente', { id_agente: parsedUser.user.id });
        const multaAgente = multaResponse.data;
        cargarMultas(multaAgente); 
        localStorage.setItem('multa', JSON.stringify(multaAgente));
      } else {
        console.error('ID de usuario no encontrado en la respuesta');
      }
      
    } catch (error) {
      console.error('Error al actualizar el contexto:', error);
    }
  };
  

  const actualizarMultaUsuario = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.user && parsedUser.user.cedula) {
        const multaResponse = await axios.get('http://localhost:4000/multasUser', {cedula: parsedUser.user.cedula});
        const multaUsuario = multaResponse.data;
        cargarMultas(multaUsuario); 
        localStorage.setItem('multa', JSON.stringify(multaUsuario));
        // setMultaUsuario(multaUsuario.data);
      } else {
        console.error('Cedula del usuario no encontrada en el almacenamiento local');
      }
    } catch (error) {
      console.error('Error al actualizar el contexto:', error);
    }
  }
  
  const ActualizarRequerimientos = async ()=>{
    try {
      const requerimientoResponse = await axios.get('http://localhost:4000/requerimiento');
      const requerimientoData = requerimientoResponse.data;
      setRequerimiento(requerimientoData);
      localStorage.setItem('requerimiento', JSON.stringify(requerimientoData));
      
    } catch (error) {
      console.log("Error al actualizar el Requerimiento")
    }
  }
  const actualizarAgentes = async ()=>{
    try {
      const agentesResponse = await axios.get('http://localhost:4000/agents');
      const agentesData = agentesResponse.data;
      setRequerimiento(agentesData);
      localStorage.setItem('requerimiento', JSON.stringify(agentesData));
      
    } catch (error) {
      console.log("Error al actualizar el Requerimiento")
    }
  }

  return (
    <Context.Provider value={{ user, loginUser, logoutUser, multa, cargarMultas, messages, addMessage, requerimiento, cargarRequerimientos , actualizarMulta, actualizarMultaUsuario, ActualizarRequerimientos, actualizarAgentes}}>
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context);
};