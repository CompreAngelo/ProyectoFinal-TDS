
import { SupabaseClientSingleton } from './dbconnection';
import { Vehiculo } from '../Models/Vehiculo';

class VehiculoRepository {
    constructor() {
      this.supabase = SupabaseClientSingleton.getInstance();
      this.tableName = 'vehiculo';
    }
  
     mapToVehiculoInstance(data) {
      return new Vehiculo(
        data.id,
        data.id_usuario,
        data.matricula,
        data.placa,
        data.marbete,
        data.ano,
        data.modelo,
        data.descripcion,
        data.tipo_Vehiculo
      );
    }
  
    async getAllVehiculos() {
      try {
        const { data, error } = await this.supabase.from(this.tableName).select('*');
        if (error) throw error;
  
        return data.map(this.mapToVehiculoInstance);
      } catch (error) {
        throw error;
      }
    }
  
    async getVehiculoById(vehiculoId) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).select('*').eq('id', vehiculoId);
        if (error) throw error;
  
        return data.length > 0 ? this.mapToVehiculoInstance(data[0]) : null;
      } catch (error) {
        throw error;
      }
    }
  
    async createVehiculo(vehiculoData) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).upsert([vehiculoData]);
        if (error) throw error;
  
        return this.mapToVehiculoInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  
    async updateVehiculo(vehiculoId, updatedVehiculoData) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).upsert([
          {
            id: vehiculoId,
            ...updatedVehiculoData,
          },
        ]);
        if (error) throw error;
  
        return this.mapToVehiculoInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  
    async deleteVehiculo(vehiculoId) {
      try {
        const { data, error } = await this.supabase.from(this.tableName).delete().eq('id', vehiculoId);
        if (error) throw error;
  
        return this.mapToVehiculoInstance(data[0]);
      } catch (error) {
        throw error;
      }
    }
  }

export { VehiculoRepository };
