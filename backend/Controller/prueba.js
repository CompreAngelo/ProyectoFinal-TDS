// controllers/conexionController.js
import { SupabaseClientSingleton } from '../data/dbContection.js';

const supabase = SupabaseClientSingleton.getInstance();

const obtenerDatosConexion = async (req, res) => {
    try {
        let { data: users, error } = await supabase
            .from('prueba')
            .select('*');

        if (error) throw error;

        res.json(users);
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los multa', error });
    }
};
export { obtenerDatosConexion };



