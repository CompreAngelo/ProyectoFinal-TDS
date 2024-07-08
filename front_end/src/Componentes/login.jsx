import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginCampos from './Comp_Helpers/loginCampos';
import '../Css/Footer-Dark-icons.css';
import '../Css/sidebar-menu.css';
import '../Css/animate.min.css';
import '../Css/loginestilo.css';
import '../Css/adicciones.css';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import BurbujasAnim from './Comp_Helpers/BurbujasAnim';
import { useAuth } from '../context/provider';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, cargarMultas, cargarRequerimientos } = useAuth();

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post('http://localhost:4000/login', userData);
      console.log(response.data);

      // CARGAR EL CONTEXTO
      loginUser(response.data);
      console.log('Usuario después de iniciar sesión:', response.data);

      // Redirigir según el rol del usuario
      switch (response.data.user?.role) {
        case 'AGENTE':
          navigate('/home-agente');
          break;
        case 'ADMINISTRADOR':
          navigate('/home-adm');
          break;
        case 'USUARIO':
          navigate('/home-usuario');
          break;
        default:
          console.error('Rol de usuario desconocido');
          toast.error('Error al obtener el rol del usuario');
      }

      // Obtener las multas y requerimientos solo si el usuario es agente
      if (response.data.user?.role === 'AGENTE' && response.data.user.id) {
        const multaRespuesta = await axios.post('http://localhost:4000/multaAgente', { id_agente: response.data.user.id });
        console.log(multaRespuesta.data);

        cargarMultas(multaRespuesta.data);
        console.log('Multa después de iniciar sesión:', multaRespuesta.data);

        const requerimientoRespuesta = await axios.get('http://localhost:4000/requerimiento');
        cargarRequerimientos(requerimientoRespuesta.data);
        console.log('Requerimientos después de iniciar sesión:', requerimientoRespuesta.data);
      }

      toast.success('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      toast.error("Error al iniciar sesión, por favor verifica tus credenciales e intenta de nuevo.");
    }
  };
  return (
<div className="login-background">
      <div class="bubbles">
        <Toaster
          toastOptions={{
            style: {
              height: '90px',
              width: '300px',
              fontSize: '16px',
            },
          }}
        />
        <div className="container-fluid" style={{ minHeight: '100vh' }}>
          <div className="container1 pulse animated">
            <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
              <div className="col-md-9 col-lg-12 col-xl-10">
                <div className="card shadow-lg o-hidden border-0 my-5">
                  <div className="card-body p-0">
                    <div className="row container3">
                      <div className="col-lg-6 d-lg-flex flex-column align-items-center">
                        <img
                          className="img-fluid m-auto justify-content-t ima"
                          src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png"
                          alt="Logo"
                        />
                        <h2 >DIGESETT</h2>
                        <h3 className="text-center">Sistema de gestion de transito</h3>
                      </div>
                      <div className="col-lg-6">
                        <div className="p-5" style={{ background: 'var(--bs-card-border-color)' }}>
                          <div className="text-center">
                            <h4 className="text-dark mb-4">¡Bienvenido!</h4>
                          </div>
                          <LoginCampos onLogin={handleLogin} />
                          <div className="text-center">
                            <Link to="/olvidocontrasena" className="link-body-emphasis small">
                              ¿Olvidaste tu contraseña?
                            </Link>
                          </div>
                          <div className="text-center">
                            <Link to="/registro" className="link-body-emphasis small">
                              ¡Crea tu cuenta!
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BurbujasAnim />
      </div>
    </div>

  );
};

export default Login;
