import React from "react";
import Navbarusuario from "./Comp_Helpers/Navbarusuario";
import Topbar from "./Comp_Helpers/Topbar";
import DatosUse from "./Comp_Helpers/Datosusuario";
import Ultimamult from "./Comp_Helpers/Ultimasmultas";
import '../Css/adicciones.css';
import '../Css/add2.css'

function HomeUsuario() {
  return (
    <>
    <div id="page-top"></div>
      <div id="wrapper">
      <Navbarusuario />
      <div className="d-flex flex-column" id="content-wrapper">
      <div id="content">
        <Topbar titulo="Home" />
          <div className="container-fluid">
            <div className="row mb-3">
                <DatosUse />
                    
              <Ultimamult />
            </div>
          </div>
      </div>
      </div>
      </div>
      </>
  );
}

export default HomeUsuario;