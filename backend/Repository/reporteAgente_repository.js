import { SupabaseClientSingleton } from '../data/dbContection.js';
import { ReporteAgente } from '../Models/reporteAgente.js';

class ReporteAgenteRepository {
  constructor() {
    this.supabase = SupabaseClientSingleton.getInstance();
    this.tableName = 'reporteAgente';
  }

  mapToReporteAgenteInstance(data) {
    return new ReporteAgente(
      data.id,
      data.nombre_agente,
      data.id_usuario,
      data.descripcion,
      data.verificado,
      data.id_multa,
      data.fecha,
      data.tipo_reporte,
      data.nombre_usuario,
      data.apellido_usuario
    );
  }

  async getAllReportesAgente() {
    try {
      const { data, error } = await this.supabase.from(this.tableName).select('*');
      if (error) throw error;

      return data.map(this.mapToReporteAgenteInstance);
    } catch (error) {
      throw error;
    }
  }

  async getReporteAgenteById(reporteId) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).select('*').eq('id', reporteId);
      if (error) throw error;

      return data.length > 0 ? this.mapToReporteAgenteInstance(data[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async createReporteAgente(reporteData) {
    try {
      const { error } = await this.supabase.from(this.tableName).upsert([reporteData]);
      if (error) throw error;
      console.log('Reporte creado exitosamente');
    } catch (error) {
      throw error;
    }
  }

  async updateReporteAgente(reporteId, updatedReporteData) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).upsert([
        {
          id: reporteId,
          ...updatedReporteData,
        },
      ]);
      if (error) throw error;

      return this.mapToReporteAgenteInstance(data[0]);
    } catch (error) {
      throw error;
    }
  }

  async deleteReporteAgente(reporteId) {
    try {
      const { data, error } = await this.supabase.from(this.tableName).delete().eq('id', reporteId);
      if (error) throw error;

      return this.mapToReporteAgenteInstance(data[0]);
    } catch (error) {
      throw error;
    }
  }
  async getAllReportesAgente() {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          usuario:id_usuario (
            nombre,
            apellido
          )
        `);

      if (error) throw error;
      console.log("Reportes obtenidos:", data);

      return data.map(this.mapToReporteAgenteInstance)
    } catch (error) {
      console.error("Error al obtener los reportes:", error);
      throw error; // Propaga el error para ser manejado por el controlador
    }
  }
}

export { ReporteAgenteRepository };
