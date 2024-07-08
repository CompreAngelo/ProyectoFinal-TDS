import { MultaRepository } from "../Repository/multa_repository.js";

class MultaController {
    constructor() {
        this.multaRepository = new MultaRepository();
    }

    async getAllMultas(req, res) {
        const { id } = req.query;
        try {
            const multas = await this.multaRepository.getAllMultas(id);
            res.status(201).json({ message: 'Se han cargado las multas con éxito', multas });
        } catch (error) {
            console.error('Error al buscar las multas:', error);
            res.status(500).json({ error: 'Error al traer las multas' });
        }

    }

    async createMulta(req, res) {
        const { cedula_usuario, nombre_multado, matricula, placa, razon, monto, id_angente } = req.body;
        const fecha = new Date(); // Obtener la fecha actual
        const multaData = { cedula_usuario, nombre_multado, matricula, placa, razon, fecha, monto, id_angente };

        try {
            const multa = await this.multaRepository.createMulta(multaData);
            res.status(201).json({ message: 'Multa creada exitosamente', multa });
        } catch (error) {
            console.error('Error al crear la multa:', error);
            res.status(500).json({ error: 'Error al crear la multa' });
        }
    }
    async getMultaByUser(req, res) {
        const { id_agente } = req.body;
        try {
            console.log('ID del agente en getMultaByUser:', id_agente);
            const multasDelAgente = await this.multaRepository.getMultaByIDAgent(id_agente);
            res.status(200).json({ message: 'Multas del agente obtenidas correctamente', multasDelAgente });
        } catch (error) {
            console.error('Error al buscar las multas:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener las multas del agente', details: error.message });
        }
    }

    async getMultaByCedulaUsuario(req, res) {
        const { cedula_usuario } = req.query; // Acceder al parámetro de la URL usando req.query
        try {
            // Utiliza el método getMultasByCedulaWithAgentName para incluir el nombre del agente
            const multasDelUsuario = await this.multaRepository.getMultasByCedulaWithAgentName(cedula_usuario);
            // Devuelve las multas con los nombres de los agentes incluidos
            res.status(200).json({ message: 'Multas del usuario obtenidas correctamente, incluyendo el nombre del agente.', multasDelUsuario });
        } catch (error) {
            console.error('Error al buscar las multas:', error.message);
            res.status(500).json({ error: 'Error interno del servidor al obtener las multas del usuario', details: error.message });
        }
    }
    
    async marcarMultaComoPagada(req, res) {
        const { multaId, estado } = req.body;

        try {
            const resultado = await this.multaRepository.updateMulta(multaId, { estado });
            if (resultado) {
                res.status(200).json({ message: 'Multa actualizada exitosamente' });
            } else {
                res.status(404).json({ error: 'Multa no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar la multa:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    async getNameAgent(req, res) {
        try {
            const multas = await this.multaRepository.getMultasWithAgentName();
            res.json(multas);
            console.log(multas);
          } catch (error) {
            res.status(500).json({ error: 'Failed to fetch multas' });
          }
    }
}
      

export { MultaController };
