import { RequerimientoRepository } from "../Repository/requerimiento_repository.js";

class RequerimientoController {
    constructor() {
        this.requerimientoRepository = new RequerimientoRepository();
    }

    async createRequerimiento(req, res) {
        const { id_agente, latitud, longitud, direccion, requerimiento, nivel } = req.body;
        const fecha = new Date(); // Obtener la fecha actual
        const requerimientoData = { id_agente, latitud, longitud, direccion, requerimiento, nivel, fecha };

        try {
            const nuevoRequerimiento = await this.requerimientoRepository.createRequerimiento(requerimientoData);
            res.status(201).json({ message: 'Requerimiento creado exitosamente', requerimiento: nuevoRequerimiento });
        } catch (error) {
            console.error('Error al crear el requerimiento:', error);
            res.status(500).json({ error: 'Error al crear el requerimiento' });
        }
    }

    async getRequerimientoById(req, res) {
        const requerimientoId = req.params.id;

        try {
            const requerimiento = await this.requerimientoRepository.getRequerimientoById(requerimientoId);

            if (requerimiento) {
                res.status(200).json({ message: 'Requerimiento obtenido correctamente', requerimiento });
            } else {
                res.status(404).json({ error: 'Requerimiento no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener el requerimiento:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener el requerimiento', details: error.message });
        }
    }

    async getAllRequerimientos(req, res) {
        try {
            const todosLosRequerimientos = await this.requerimientoRepository.getAllRequerimientos();
            res.status(200).json({ message: 'Todos los requerimientos obtenidos correctamente', requerimientos: todosLosRequerimientos });
        } catch (error) {
            console.error('Error al obtener todos los requerimientos:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener todos los requerimientos', details: error.message });
        }
    }

    async getRequerimientosByAgent(req, res) {
        const { id_agente } = req.body;
        try {
            console.log('ID del agente en getRequerimientosByAgent:', id_agente);
            const requerimientosDelAgente = await this.requerimientoRepository.getRequerimientosByAgent(id_agente);
            res.status(200).json({ message: 'Requerimientos del agente obtenidos correctamente', requerimientosDelAgente });
        } catch (error) {
            console.error('Error al buscar los requerimientos:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener los requerimientos del agente', details: error.message });
        }
    }

    async updateRequerimiento(req, res) {
        const requerimientoId = req.params.id;
        const updatedRequerimientoData = req.body;

        try {
            const requerimientoActualizado = await this.requerimientoRepository.updateRequerimiento(requerimientoId, updatedRequerimientoData);
            res.status(200).json({ message: 'Requerimiento actualizado correctamente', requerimiento: requerimientoActualizado });
        } catch (error) {
            console.error('Error al actualizar el requerimiento:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al actualizar el requerimiento', details: error.message });
        }
    }

    async deleteRequerimiento(req, res) {
        const requerimientoId = req.params.id;

        try {
            const requerimientoEliminado = await this.requerimientoRepository.deleteRequerimiento(requerimientoId);
            res.status(200).json({ message: 'Requerimiento eliminado correctamente', requerimiento: requerimientoEliminado });
        } catch (error) {
            console.error('Error al eliminar el requerimiento:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al eliminar el requerimiento', details: error.message });
        }
    }
}

export { RequerimientoController };
