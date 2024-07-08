import React from "react";
import "../Css/Footer-Dark-icons.css";
import "../Css/sidebar-menu.css";
import "../Css/bootstrap.min.css";
import "../Css/animate.min.css";
import "../Css/adicciones.css";
import Navbar from "./Comp_Helpers/Navbar";
import Navbarusuario from "./Comp_Helpers/Navbarusuario.jsx";
import Navbaradm from "./Comp_Helpers/Navbaradm.jsx";
import Topbar from "./Comp_Helpers/Topbar";
import Footer from './Comp_Helpers/Footer.jsx';
import FotoMulta from "./Comp_Helpers/perfilFotoyMultas.jsx";
import PerfilDatos from "./Comp_Helpers/perfilDatosContainer.jsx";
import PerfilOtrosD from "./Comp_Helpers/perfilOtrosDatosContainer.jsx";
import { useAuth } from '../context/provider';

function Perfil() {

    const { user } = useAuth(); // Obtén el usuario del contexto

    // Renderiza el Navbar correspondiente según el rol del usuario
    const renderNavbar = () => {
        switch (user?.user?.role) {
            case 'ADMINISTRADOR':
                return <Navbaradm />;
            case 'USUARIO':
                return <Navbarusuario />;
            case 'AGENTE':
                return <Navbar />;
            default:
                return <Navbarusuario />; // Puedes manejar otros casos o retornar null si no hay un rol definido
        }
    };

    return (
        <>
            <div id="page-top"></div>
            <div id="wrapper">
                {renderNavbar()}
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <Topbar titulo="Perfil" />
                        <div className="container-fluid">
                            <h3 className="text-dark mb-4">Usuario</h3>
                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <FotoMulta />
                                </div>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col">
                                            <PerfilDatos />
                                            <PerfilOtrosD />
                                        </div>

                                    </div>
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

export default Perfil;
