
import { SupabaseClientSingleton } from '../data/dbContection.js';
import { Multa } from '../Models/Multa.js';

class MultaRepository {
  constructor() {
    this.supabase = SupabaseClientSingleton.getInstance();
    this.tableName = 'multa';
  }

  mapToMultaInstance(data) {
    return new Multa(
      data.id,
      data.cedula_usuario,
      data.nombre_multado,
      data.matricula,
      data.placa,
      data.razon,
      data.estado,
      new Date().toISOString(),
      data.monto,
      data.id_angente,
      data.nombre_agente
    );
  }

  async getAllMultas() {
    try {
      const { data, error } = await this.supabase.from(this.tableName).select('*');
      if (error) throw error;

      return data.map(this.mapToMultaInstance);
    } catch (error) {
      throw error;
    }
  }

  async getMultaById(multaId) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).select('*').eq('id', multaId);
      if (error) throw error;

      return data.length > 0 ? this.mapToMultaInstance(data[0]) : null;
    } catch (error) {
      throw error;
    }
  }
  // En tu MultaRepository
  async getMultaByIDAgent(id_agente) {
    try {
      console.log('ID del agente:', id_agente);
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('id_angente', id_agente);
      console.log('Resultados de la consulta:', data);
      if (error) {
        console.error('Error al buscar las multas en el repositorio:', error);
        throw error;
      }
      return data.length > 0 ? data.map(this.mapToMultaInstance) : null;
    } catch (error) {
      console.error('Error al traer las multas en el repositorio:', error);
      throw error;
    }
  }

  async createMulta(multaData) {
    try {
      console.log('Intentando insertar multa:', multaData);
      const { error } = await this.supabase.from(this.tableName).upsert([multaData]);
      if (error) throw error;
      console.log('Multa insertada exitosamente');
    } catch (error) {
      throw error;
    }
  }

  async deleteMulta(multaId) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).delete().eq('id', multaId);
      if (error) throw error;

      return this.mapToMultaInstance(data[0]);
    } catch (error) {
      throw error;
    }
  }
  async getAllMultas() {
    try {
      // Realizar la consulta a la base de datos para obtener los usuarios con el rol de AGENTE
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')

      if (error) {
        throw error;
      }

      // Mapear los datos de los usuarios a instancias de Usuario y devolverlos
      const multas = data.map(multaData => {
        const multa = new Multa(); // Cambiado a "multa" en lugar de "multas"
        multa.id = multaData.id;
        multa.cedula_usuario = multaData.cedula_usuario;
        multa.nombre_multado = multaData.nombre_multado;
        multa.matricula = multaData.matricula;
        multa.placa = multaData.placa;
        multa.razon = multaData.razon;
        multa.fecha = multaData.fecha;
        multa.monto = multaData.monto;
        multa.id_angente = multaData.id_angente;
        return multa; // Devolver la instancia de multa
      });

      return multas; // Devolver el array de multas
    } catch (error) {
      throw error;
    }
  }

  async getMultaByCedulaUsuario(cedula_usuario) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('cedula_usuario', cedula_usuario);

      // Mapear los datos de los usuarios a instancias de Usuario y devolverlos
      const multas = data.map(multaData => {
        const multa = new Multa(); // Cambiado a "multa" en lugar de "multas"
        multa.id = multaData.id;
        multa.cedula_usuario = multaData.cedula_usuario;
        multa.nombre_multado = multaData.nombre_multado;
        multa.matricula = multaData.matricula;
        multa.placa = multaData.placa;
        multa.razon = multaData.razon;
        multa.fecha = multaData.fecha;
        multa.monto = multaData.monto;
        multa.id_angente = multaData.id_angente;
        multa.estado = multaData.estado;
        return multa; // Devolver la instancia de multa
      });


      if (error) {
        console.error('Error al buscar las multas en el repositorio:', error);
        throw error;
      }

      return multas;

      // console.log('Resultados de la consulta:', data);
      // return data.length > 0 ? data.map(this.mapToMultaInstance) : null;

    } catch (error) {
      console.error('Error al traer las multas en el repositorio:', error);
      throw error;
    }
  }
  async updateMulta(multaId, updatedMultaData) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updatedMultaData) // Asegúrate de que updatedMultaData contenga 'estado'
        .eq('id', multaId);

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error al actualizar la multa:', error);
      throw error;
    }
  }

  async getMultasWithAgentName() {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
        *,
        usuario:usuario_id (
          nombre,
          apellido
        )
      `)
        .eq('estado', 'ACTIVO');  // O cualquier otro filtro que necesites

      if (error) throw error;

      return data.map(multa => ({
        ...multa,
        nombre_agente: `${multa.usuario.nombre} ${multa.usuario.apellido}`
      }));
    } catch (error) {
      console.error('Error fetching multas with agent name:', error);
      throw error;
    }
  }
  async getMultasByCedulaWithAgentName(cedula_usuario) {
    try {
      // Realiza un join con la tabla de usuarios para obtener el nombre del agente
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
                *,
                agente:id_angente (
                    nombre,
                    apellido
                )
            `)
        .eq('cedula_usuario', cedula_usuario);  // Filtra las multas por cédula de usuario

      if (error) throw error;

      // Mapea los resultados para incluir el nombre del agente en el objeto de la multa
      return data.map(multa => ({
        ...multa,
        nombre_agente: multa.agente ? `${multa.agente.nombre} ${multa.agente.apellido}` : 'Agente no asignado'
      }));
    } catch (error) {
      console.error('Error fetching multas with agent name:', error);
      throw error;
    }
  }

}


export { MultaRepository };