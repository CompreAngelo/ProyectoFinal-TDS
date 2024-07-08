import React from "react";
import { IconoHistorial, IconoHome, IconoMultas, IconoXD, Icono, IconoTop } from "./Iconos.jsx"

function Footer() {
    return (
        <footer className="text-center bg-dark">
            {/* Contenido del pie de página */}
            <div className="container text-white py-5 py-lg-5">
                <p className="mb-0"><br />Dirección General de Seguridad de Tránsito y Transporte Terrestre | DIGESETT<br /><br />Ave. Expreso V Centenario esq. San Martín, Santo Domingo, R.D<br /><br />info@digesett.gob.do<br /><br /></p>
                <p className="text-muted mb-0">Todos los Derechos Reservados © 2024&nbsp;</p>
            </div>
        </footer>
    );
}

export default Footer;