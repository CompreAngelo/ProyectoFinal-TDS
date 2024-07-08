import React, { useState, useEffect } from "react";

const ReportCard = ({ reports }) => {
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    // Asegurar que reports es un arreglo antes de usarlo
    if (Array.isArray(reports)) {
      setFilteredReports(reports);
    }
  }, [reports]);

  const handleDelete = (id) => {
    setFilteredReports(prevReports => prevReports.filter(report => report.id !== id));
  };

  const handleResolve = (id) => {
    setFilteredReports(prevReports => prevReports.map(report => {
      if (report.id === id) {
        return { ...report, resolved: true };
      }
      return report;
    }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      const filtered = reports.filter(report =>
        report.descripcion.toLowerCase().includes(term.toLowerCase()) ||
        report.usuario?.nombre.toLowerCase().includes(term.toLowerCase()) ||
        report.usuario?.apellido.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  };

  const handleFilter = (status) => {
    setFilterStatus(status);
    if (status === "resolved") {
      const filtered = reports.filter(report => report.resolved);
      setFilteredReports(filtered);
    } else if (status === "unresolved") {
      const filtered = reports.filter(report => !report.resolved);
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  };

  return (
    <div id="content">
      <h3 className="fw-bold text-dark mb-4">ÚLTIMOS REPORTES</h3>
      <div className="d-flex flex-column align-items-start">
        <div className="d-flex align-items-center mb-2">
          <label htmlFor="selectw" className="filter-label mb-1 me-2">Filtrar por estado:</label>
          <select id="selectw" className="form-select" onChange={(e) => handleFilter(e.target.value)}>
            <option value="">Todos</option>
            <option value="resolved">Resueltos</option>
            <option value="unresolved">No resueltos</option>
          </select>
          <input type="text" className="form-control ms-2" placeholder="Buscar..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Tipo de reporte</th>
              <th>Nombre del agente</th>
              <th>Usuario</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Verificado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(report => (
              <tr key={report.id}>
                <td>{report.tipo_reporte}</td>
                <td>{report.nombre_agente}</td>
                <td>{report.usuario ? `${report.usuario.nombre} ${report.usuario.apellido}` : 'No disponible'}</td>
                <td>{report.descripcion}</td>
                <td>{report.fecha}</td>
                <td>{report.verificado ? 'Sí' : 'No'}</td>
                <td>
                  {!report.resolved ? (
                    <button className="btn btn-success" onClick={() => handleResolve(report.id)}>Resolver</button>
                  ) : (
                    <span className="text-success">Resuelto</span>
                  )}
                  <button className="btn btn-danger ms-2" onClick={() => handleDelete(report.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportCard;
