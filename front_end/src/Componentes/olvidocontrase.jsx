import React, { useState } from "react";
import OlvidocontraCampos from "./Comp_Helpers/olvidocontraCampos";
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/animate.min.css";
import "../Css/olvidocontraseestilo.css";
import "../Css/adicciones.css";
import toast, { Toaster } from 'react-hot-toast';
import { EnviarCorreo } from "../new_password";
import axios from 'axios';
import BurbujasAnim from "./Comp_Helpers/BurbujasAnim";

function Olvidocontrase() {
    const [email, setEmail] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const generateRandomPassword = () => {
        const length = 8;
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    const handleResetPassword = async () => {
        if (!validateEmail(email)) {
            toast.error('Por favor, ingrese un correo electrónico válido.');
            return;
        }

        const newPassword = generateRandomPassword();

        try {
            // Llamada a la API para actualizar la contraseña
            const response = await axios.post(`http://localhost:4000/reset-password`, { email, newPassword });
            toast.success('Contraseña actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar contraseña:', error);
            toast.error('Error al actualizar contraseña. Por favor, inténtelo de nuevo.');
        }
        EnviarCorreo(email, newPassword);
    };

    return (
        <div className="olvidocontra-background">
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div className="container1 col-md-9 col-lg-12 col-xl-10 pulse animated">
                        <div className="card shadow-lg o-hidden border-0 my-5">
                            <div className="card-body p-0">
                                <div className="row container4">
                                    <div className="col-lg-6 d-none d-lg-flex flex-column align-items-center">
                                        <img className="m-auto imagenolvidocontra" src="https://nizaero.com/wp-content/uploads/2018/07/Logo-DIGESETT-292x300.png" alt="Logo" />
                                        <h2 >DIGESETT</h2>
                                        <h3 className="text-center">Sistema de gestion de transito</h3>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="p-5" style={{ background: 'var(--bs-card-border-color)' }}>
                                            <div className="text-center">
                                                <h4 className="text-dark mb-2">Se le olvidó la contraseña?</h4>
                                                <p className="mb-4">Lo Entendemos, estas cosas pasan. Ingresa tu direccion de correo electrónico abajo y te enviaremos un enlace para restablecer la contraseña!</p>
                                            </div>
                                            <OlvidocontraCampos onSubmit={handleResetPassword} setEmail={setEmail} />
                                            <div className="text-center">
                                                <hr />
                                                <a className="link-body-emphasis small" href="/Registro">Crear una cuenta!</a>
                                            </div>
                                            <div className="text-center">
                                                <a className="link-body-emphasis small" href="/">Ya estás registrado? Inicia Sesión!</a>
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
        </div>
    );
}

export default Olvidocontrase;