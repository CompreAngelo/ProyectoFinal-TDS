import React, { useState, useEffect  } from "react";
import Navbaradm from "./Comp_Helpers/Navbaradm";
import Topbar from "./Comp_Helpers/Topbar";
import Footer from './Comp_Helpers/Footer.jsx';
import ReportCard from './Comp_Helpers/Reportcard';
import "../Css/admcss.css";
import axios from 'axios'; // Asegúrate de importar axios

const Reportesadm = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:4000/reportesAgente');
        // Asumiendo que response.data ya es el array de reportes
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <>
      <div id="page-top"></div>
      <div id="wrapper">
        <Navbaradm />
        <div className="d-flex flex-column" id="content-wrapper">
          <div id="content">
            <Topbar titulo="Reportes de Usuarios" />
            <div className="container-fluid">
              <h3 className="text-dark mb-4">Reportes</h3>
              <div className="row mb-3">
                  {/* Asegúrate de que reports es el array correcto que se debe pasar */}
                  <ReportCard reports={reports} />
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reportesadm;
