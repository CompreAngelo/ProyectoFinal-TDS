import { ReporteAgenteRepository } from "../Repository/reporteAgente_repository.js";

class ReporteAgenteController {
    constructor() {
        this.reporteAgenteRepository = new ReporteAgenteRepository();
    }



    async createReporteAgente(req, res) {
        const { nombre_agente, id_usuario, descripcion, verificado, id_multa, fecha, tipo_reporte } = req.body;
        const reporteData = { nombre_agente, id_usuario, descripcion, verificado, id_multa, fecha, tipo_reporte };

        try {
            const reporte = await this.reporteAgenteRepository.createReporteAgente(reporteData);
            res.status(201).json({ message: 'Reporte de agente creado exitosamente', reporte });
        } catch (error) {
            console.error('Error al crear el reporte de agente:', error);
            res.status(500).json({ error: 'Error al crear el reporte de agente', details: error.message });
        }
    }
    async getAllReportesAgente(req, res) {
        try {
            const reportes = await this.reporteAgenteRepository.getAllReportesAgente();
            res.status(200).json(reportes);
        } catch (error) {
            console.error('Error al obtener todos los reportes:', error);
            res.status(500).json({ error: 'Error al obtener los reportes', details: error.message });
        }
    }
}

export { ReporteAgenteController };