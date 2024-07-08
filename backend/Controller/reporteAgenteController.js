import { ReporteAgenteRepository } from "../Repository/reporteAgente_repository.js";

class ReporteAgenteController {
    constructor() {
        this.reporteAgenteRepository = new ReporteAgenteRepository();
    }

    async createReporteAgente(req, res) {
        const { nombre_agente, id_usuario, descripcion, verificado, id_multa, fecha, tipo_reporte } = req.body;
        const reporteAgenteData = { nombre_agente, id_usuario, descripcion, verificado, id_multa, fecha, tipo_reporte };

        try {
            const reporteAgente = await this.reporteAgenteRepository.createReporteAgente(reporteAgenteData);
            res.status(201).json({ message: 'Reporte creado exitosamente', reporteAgente });
        } catch (error) {
            console.error('Error al crear el reporte:', error);
            res.status(500).json({ error: 'Error al crear el reporte' });
        }
    }

    async getReporteAgenteByUser(req, res) {
        const { id_usuario } = req.body;
        try {
            console.log('ID del usuario en getReporteAgenteByUser:', id_usuario);
            const reportesDelUsuario = await this.reporteAgenteRepository.getReporteAgenteByUser(id_usuario);
            res.status(200).json({ message: 'Reportes del usuario obtenidos correctamente', reportesDelUsuario });
        } catch (error) {
            console.error('Error al buscar los reportes:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener los reportes del usuario', details: error.message });
        }
    }

    async getAllReportesAgente(req, res) {
        try {
            const reportes = await this.reporteAgenteRepository.getAllReportesAgente();
            res.status(200).json({ message: 'Reportes obtenidos correctamente', reportes });
        } catch (error) {
            console.error('Error al buscar todos los reportes:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener todos los reportes', details: error.message });
        }
    }
}

export { ReporteAgenteController };
