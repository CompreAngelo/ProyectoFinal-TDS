import React, { useEffect, useState } from "react";
import axios from 'axios';
import NmCedDes from "./Comp_Helpers/nuevamultaCedDes.jsx";
import NmDatosCon from "./Comp_Helpers/nuevamultaDatosContainer.jsx";
import NmOtroCon from "./Comp_Helpers/nuevamultaOtrosDetallesContainer.jsx";
import Navbar from "./Comp_Helpers/Navbar";
import Topbar from "./Comp_Helpers/Topbar";
import Footer from './Comp_Helpers/Footer.jsx';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/provider.jsx';

function Nuevamulta() {
    const {actualizarMulta} = useAuth()
    
    const [nombre, setNombre] = useState('');
    const [cedula, setCedula] = useState('');
    const [matricula, setMatricula] = useState('');
    const [placa, setPlaca] = useState('');
    const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
    const [formData, setFormData] = useState({
        razon: '',
        monto: ''
    });

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        if (!matricula || !placa) {
            toast.error('Por favor completa los campos de matrícula y placa.');
            return;
        }

        try {
            const storedUser = localStorage.getItem('user');
            console.log('Contenido de storedUser:', storedUser);
            const parsedUser = JSON.parse(storedUser);
          
            console.log('Objeto parsedUser:', parsedUser.user.id);
          
            const response = await axios.post('http://localhost:4000/createMulta', {
                cedula_usuario: cedula,
                nombre_multado: nombre,
                matricula: matricula,
                placa: placa,
                razon: formData.razon,
                monto: formData.monto,
                id_angente: parsedUser.user.id 
            });
            actualizarMulta();
            toast.success('Multa creada exitosamente');
            
        } catch (error) {
            toast.error('Error al crear la multa');
            console.error('Error al crear la multa:', error);   
        }
    };

    const handleFormDataChange = (data) => {
        setFormData(data);
    };

    const handleSaveToLocal = () => {
        console.log("Datos guardados en el estado local:", formData);
    };

    return (
        <>
            <div id="page-top"></div>
            <div id="wrapper">
                <Toaster
                    toastOptions={{
                        style: {
                            height: '90px',
                            width: '300px',
                            fontSize: '16px',
                        },
                    }}
                />
                <Navbar />
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <Topbar titulo="Asignación de Multas" />
                        <div className="container-fluid">
                            <h3 className="text-dark mb-4">Nueva Multa</h3>
                            <div className="row mb-3">
                                <NmCedDes setNombre={setNombre} setCedula={setCedula} />
                                <div className="col-lg-8">
                                    <NmDatosCon
                                        nombre={nombre}
                                        setMatricula={setMatricula}
                                        setPlaca={setPlaca}
                                        setFecha={setFecha}
                                        handleFormSubmit={handleFormSubmit}
                                    />
                                    <NmOtroCon
                                        onFormDataChange={handleFormDataChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Nuevamulta;
