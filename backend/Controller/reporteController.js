import { ReporteRepository } from "../Repository/reporte_repository.js";

class ReporteController {
    constructor() {
        this.reporteRepository = new ReporteRepository();
    }

    async createReporte(req, res) {
        const { tipo, razon, lugar, comentario, fecha, estado, numero_testigo, id_usuario, requerimiento } = req.body;
        const reporteData = { tipo, razon, lugar, comentario, fecha, estado, numero_testigo, id_usuario, requerimiento };

        try {
            const reporte = await this.reporteRepository.createReporte(reporteData);
            res.status(201).json({ message: 'Reporte creado exitosamente', reporte });
        } catch (error) {
            console.error('Error al crear el reporte:', error);
            res.status(500).json({ error: 'Error al crear el reporte' });
        }
    }

    async getReporteByUser(req, res) {
        const { id_usuario } = req.body;
        try {
            console.log('ID del usuario en getReporteByUser:', id_usuario);
            const reportesDelUsuario = await this.reporteRepository.getReporteByUser(id_usuario);
            res.status(200).json({ message: 'Reportes del usuario obtenidos correctamente', reportesDelUsuario });
        } catch (error) {
            console.error('Error al buscar los reportes:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener los reportes del usuario', details: error.message });
        }
    }

    async getAllReportes(req, res) {
        try {
            const reportes = await this.reporteRepository.getAllReportes();
            res.status(200).json({ message: 'Reportes obtenidos correctamente', reportes });
        } catch (error) {
            console.error('Error al buscar todos los reportes:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener todos los reportes', details: error.message });
        }
    }
}

export { ReporteController };
