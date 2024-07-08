import { SupabaseClientSingleton } from '../data/dbContection.js';
import { requerimiento } from '../Models/requerimiento.js';

class RequerimientoRepository {
    constructor() {
        this.supabase = SupabaseClientSingleton.getInstance();
        this.tableName = 'requerimiento';
    }

    mapToRequerimientoInstance(data) {
        return new requerimiento(
            data.id,
            data.id_agente,
            data.latitud,
            data.longitud,
            data.direccion,
            data.requerimiento,
            data.nivel,
            data.fecha
        );
    }

    async getAllRequerimientos() {
        try {
            const { data, error } = await this.supabase.from(this.tableName).select('*');
            if (error) throw error;

            return data.map(this.mapToRequerimientoInstance);
        } catch (error) {
            throw error;
        }
    }

    async getRequerimientoById(requerimientoId) {
        try {
            const { data, error } = await this.supabase.from(this.tableName).select('*').eq('id', requerimientoId);
            if (error) throw error;

            return data.length > 0 ? this.mapToRequerimientoInstance(data[0]) : null;
        } catch (error) {
            throw error;
        }
    }

    async getRequerimientosByAgent(id_agente) {
        try {
            const { data, error } = await this.supabase.from(this.tableName).select('*').eq('id_agente', id_agente);
            if (error) throw error;

            return data.length > 0 ? data.map(this.mapToRequerimientoInstance) : null;
        } catch (error) {
            throw error;
        }
    }

    async createRequerimiento(requerimientoData) {
        try {
            console.log('Intentando insertar requerimiento:', requerimientoData);
            const { error } = await this.supabase.from(this.tableName).upsert([requerimientoData]);
            if (error) throw error;
            console.log('requerimiento insertado exitosamente');
          } catch (error) {
            throw error;
          }
    }

    async updateRequerimiento(requerimientoId, updatedRequerimientoData) {
        try {
            const { data, error } = await this.supabase.from(this.tableName).upsert([
                {
                    id: requerimientoId,
                    ...updatedRequerimientoData,
                },
            ]);
            if (error) throw error;

            return this.mapToRequerimientoInstance(data[0]);
        } catch (error) {
            throw error;
        }
    }

    async deleteRequerimiento(requerimientoId) {
        try {
            const { data, error } = await this.supabase.from(this.tableName).delete().eq('id', requerimientoId);
            if (error) throw error;

            return this.mapToRequerimientoInstance(data[0]);
        } catch (error) {
            throw error;
        }
    }
}

export { RequerimientoRepository };
