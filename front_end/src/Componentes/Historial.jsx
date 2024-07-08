import React from "react";
import Navbar from "./Comp_Helpers/Navbar";
import Topbar from "./Comp_Helpers/Topbar";
import Footer from './Comp_Helpers/Footer.jsx';
import toast, { Toaster } from 'react-hot-toast';
import HisDescr from "./Comp_Helpers/historialDescr.jsx";
//import HisUltNotif from "./Comp_Helpers/historialUltNotif.jsx";
import { IconoTop } from "../Componentes/Comp_Helpers/Iconos.jsx"


function Historial (){

    return(
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
                            <h3 className="text-dark mb-4">Multas previas</h3>
                            <div className="row mb-3">
                            <HisDescr />

                            </div>
                        </div>
                        <Footer />
                    </div>
                    <a className="border rounded d-inline scroll-to-top" href="#page-top"> <IconoTop width={40} height={40} /><i className="fas fa-angle-up"> </i></a>
                </div>
            </div>
        </>
    );
};

export default Historial;