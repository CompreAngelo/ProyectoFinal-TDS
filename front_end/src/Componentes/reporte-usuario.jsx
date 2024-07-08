import React from "react";
import Navbarusuario from "./Comp_Helpers/Navbarusuario";
import Topbar from "./Comp_Helpers/Topbar";
import '../Css/adicciones.css';
import DatosReport from "./Comp_Helpers/DatosReporte";

function ReporteUsuario() {
  return (
    <>
    <div id="page-top"></div>
      <div id="wrapper">
      <Navbarusuario />
      <div className="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <Topbar titulo="Reporte" />
          <div className="container-fluid">
              <DatosReport/>
          </div>
      </div>
      </div>
      </div>

      </>
  );
}

export default ReporteUsuario;