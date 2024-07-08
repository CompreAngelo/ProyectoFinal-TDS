import { SupabaseClientSingleton } from "../data/dbContection.js";
import { UsuarioRepository } from '../Repository/UsuarioRepository.js';  // Ajusta la ruta según tu estructura
import { generarContraseñaTemporal } from '../logic/genrarContraseña.js';
import bcrypt from 'bcryptjs';


class UsuarioController {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
    this.supabase = SupabaseClientSingleton.getInstance();
    this.supabase = SupabaseClientSingleton.getInstance();
  }


  async getAllUsers(req, res) {

    try {
      const usuarios = await this.usuarioRepository.getAllUsers();
      res.json(usuarios);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error obteniendo usuarios');
    }
  }
  async updateUserByNewPassword(req, res) {
    const { email, newPassword } = req.body;

    try {
      // Validar los datos de entrada
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'El correo electrónico es requerido y debe ser una cadena de caracteres.' });
      }

      if (!newPassword || typeof newPassword !== 'string') {
        return res.status(400).json({ error: 'La nueva contraseña es requerida y debe ser una cadena de caracteres.' });
      }

      // Validar el formato del correo electrónico
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'El formato del correo electrónico no es válido.' });
      }

      // Validar la longitud de la nueva contraseña
      if (newPassword.length < 8) {
        return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 8 caracteres.' });
      }

      // Realizar la actualización de la contraseña
      await this.usuarioRepository.updateUserPasswordByEmail(email, newPassword);

      // Si todo está bien, enviar una respuesta exitosa
      res.status(200).json({ mensaje: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      console.error('Error al actualizar contraseña del usuario:', error);
      res.status(500).json({ error: 'Error al actualizar contraseña del usuario' });
    }
  }
  //obtener los datos del front
  //obtener los datos del front
  async login(req, res) {
    const { cedula, contrasena } = req.body;

    try {
      console.log("Cédula recibida:", cedula);
      console.log("Contraseña recibida:", contrasena);

      const user = await this.usuarioRepository.loginUser(cedula, contrasena);
      console.log("Usuario encontrado en la base de datos:", user);

      res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(401).send('Credenciales inválidas');
    }
  }

  async registerUser(req, res) {
    const { nombre, apellido, cedula, correo, telefono, contrasena, estado, horario_entrada, horario_salida, salario } = req.body;

    try {

      const existingUserByCedula = await this.usuarioRepository.getUserByCedula(cedula);
      if (existingUserByCedula) {
        return res.status(400).json({ message: "Ya existe un usuario con esta cédula." });
      }

      const existingUser = await this.usuarioRepository.getUserByEmail(correo);
      if (existingUser) {
        return res.status(400).json({ message: "El correo electrónico ya está en uso." });
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const newUser = await this.usuarioRepository.createUser({
        nombre,
        apellido,
        cedula,
        correo,
        estado,
        horario_entrada,
        horario_salida,
        salario,
        role: 'USUARIO',
        telefono,
        contrasena: hashedPassword
      });

      return res.status(201).json({ message: `Usuario ${newUser.nombre} registrado correctamente`, user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al registrar el usuario", error: error.message })
    }
  }
 //<--LOGIA DE CREACION DE AGENTE-->
    async createAgent(req, res) {
      const {
        nombre,
        apellido,
        cedula,
        correo,
        telefono,
        contrasena,
        estado,
        horario_entrada,
        horario_salida,
        salario
      } = req.body;

      try {
        // Verificar si ya existe un usuario con la misma cédula
        const existingUserByCedula = await this.usuarioRepository.getUserByCedula(cedula);
        if (existingUserByCedula) {
          return res.status(400).json({ message: "Ya existe un usuario con esta cédula." });
        }
        
        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUserByEmail = await this.usuarioRepository.getUserByEmail(correo);
        if (existingUserByEmail) {
          return res.status(400).json({ message: "El correo electrónico ya está en uso." });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear el nuevo agente utilizando el método del repositorio
        const newAgent = await this.usuarioRepository.createAgente({
          nombre,
          apellido,
          cedula,
          correo,
          estado,
          horario_entrada,
          horario_salida,
          salario,
          role: 'AGENTE',
          telefono,
          contrasena: hashedPassword
        });

        return res.status(201).json({ message: `Agente ${newAgent.nombre} registrado correctamente`, agent: newAgent }); 
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar el agente", error: error.message });
      }
    }


  async getUserNameByCedula(req, res) {
    const { cedula } = req.body;

    try {
      // Validar que la cédula no esté vacía
      if (!cedula || typeof cedula !== 'string') {
        return res.status(400).json({ error: 'La cédula es requerida y debe ser una cadena de caracteres.' });
      }

      // Obtener el nombre del usuario por su cédula
      const nombre = await this.usuarioRepository.getUserNameByCedula(cedula);

      // Enviar el nombre del usuario al frontend
      res.json({ nombre });
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
      res.status(500).json({ error: 'Error al obtener el nombre del usuario' });
    }
  }

  /*------------------------------------Logica de administrador------------------------------------*/
  async getAllAgents(req, res) {
    try {
      const agents = await this.usuarioRepository.getAgents();
      // Imprime los datos de los agentes en la consola
      console.log(agents);
      // Asegúrate de enviar la respuesta con el código de estado 200 y los datos de los agentes
      res.status(200).json(agents);
    } catch (error) {
      console.error(error);
      // Envía un mensaje de error con el código de estado 500
      res.status(500).json({ error: 'Error al obtener los agentes' });
    }
  }

  async updateAgentDetails(req, res) {
    const { userId, horario_entrada, horario_salida, estado, telefono } = req.body;

    try {
      // Validar que el ID del usuario no esté vacío y sea un número
      if (!userId || typeof userId !== 'number') {
        return res.status(400).json({ error: 'El ID del usuario es requerido y debe ser un número.' });
      }

      // Preparar el objeto de actualización, solo incluyendo los campos que se proporcionaron
      const updateObject = {};
      if (horario_entrada !== undefined) {
        updateObject.horario_entrada = horario_entrada;
      }
      if (horario_salida !== undefined) {
        updateObject.horario_salida = horario_salida;
      }
      if (estado !== undefined) {
        updateObject.estado = estado;
      }
      if (telefono !== undefined) {
        updateObject.telefono = telefono;
      }

      // Verificar si hay al menos un campo para actualizar
      if (Object.keys(updateObject).length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron detalles para actualizar el agente.' });
      }

      // Realizar la actualización de los detalles del agente
      const updatedAgent = await this.usuarioRepository.updateAgentDetails(userId, updateObject);

      // Si todo está bien, enviar una respuesta exitosa
      res.status(200).json({ message: 'Detalles del agente actualizados exitosamente', agent: updatedAgent });
    } catch (error) {
      console.error('Error al actualizar los detalles del agente:', error);
      res.status(500).json({ error: 'Error al actualizar los detalles del agente' });
    }
  }

  async updateUser(req, res) {
    const userId = req.params.id; // Obtener el ID del usuario de la solicitud
    const { telefono, contrasena } = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

    try {
      // Verificar si el usuario existe antes de intentar actualizarlo
      const updatedUserData = {};
      if (telefono) {
        updatedUserData.telefono = telefono;
      }
      if (contrasena) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);
        updatedUserData.contrasena = hashedPassword;
      }

      // Actualizar el usuario
      await this.usuarioRepository.updateUser({ id: userId, ...updatedUserData });

      res.status(200).json({ message: 'Los datos fueron actualizados exitosamente!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Se produjo un error al actualizar los datos del usuario' });
    }

  }

  //actualizar agente
  async updateAgent(req, res) {
    const { id } = req.params;  // Asegúrate de obtener el ID desde params ahora que está definido en la ruta
    const { telefono, horarioEntrada, horarioSalida, estado, role, contrasena } = req.body;

    // Validación básica para verificar si el ID está presente
    if (!id) {
        return res.status(400).json({ error: "El ID del agente es necesario." });
    }

    try {
        const updatedAgent = await this.usuarioRepository.updateAgent({ id, telefono, horarioEntrada, horarioSalida, estado, role, contrasena });
        res.status(200).json({
            message: 'Agente actualizado correctamente',
            data: updatedAgent
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Se produjo un error al actualizar los datos del agente'
        });
    }
  }

  async uploadAndStoreImage(req, res) {
    const { foto, foto_Vehiculo } = req.body;
    const userId = req.params.id;

    try {
      // Llamada al método para cargar imágenes y obtener las URLs
      const { fotoUrl, foto_VehiculoUrl } = await this.usuarioRepository.uploadImage(userId, foto, foto_Vehiculo);

      // Llamada al método para almacenar las URLs en el registro del usuario
      const data = await this.usuarioRepository.storeImage(userId, fotoUrl, foto_VehiculoUrl);

      res.json({ message: 'Imágenes subidas y URLs guardadas exitosamente!' });
    } catch (error) {
      console.error('Error en uploadAndStoreImage: ', error);
      res.status(500).send(error.message);
    }
  }

  async registerAgent(req, res) {
    const {nombre, apellido, cedula, correo, telefono, contrasena, estado, horario_entrada, horario_salida, salario} = req.body;
    console.log('TELEFONOBACK'+ telefono)
    try {

      const existingUserByCedula = await this.usuarioRepository.getUserByCedula(cedula);
      if (existingUserByCedula) {
        return res.status(400).json({ message: "Ya existe un usuario con esta cédula." });
      }

      const existingUser = await this.usuarioRepository.getUserByEmail(correo);
      if (existingUser) {
        return res.status(400).json({ message: "El correo electrónico ya está en uso." });
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const newUser = await this.usuarioRepository.createAgent({
        nombre,
        apellido,
        cedula,
        correo,
        estado :'ACTIVO',
        horario_entrada,
        horario_salida,
        salario,
        role: 'AGENTE',
        telefono,
        contrasena: hashedPassword
      });

      return res.status(201).json({ message: `Agente ${newUser.nombre} registrado correctamente`, user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al registrar el usuario", error: error.message })
    }
  }

  async uploadAndStoreImageVehicle(req, res) {
    const { foto_Vehiculo } = req.body;
    const userId = req.params.id;

    try {
      // Llamada al método para cargar imágenes y obtener las URLs
      const { foto_VehiculoUrl } = await this.usuarioRepository.uploadImageVehicle(userId, foto_Vehiculo);

      // Llamada al método para almacenar las URLs en el registro del usuario
      const data = await this.usuarioRepository.storeImageVehicle(userId, foto_VehiculoUrl);

      res.json({ message: 'Imágenen vehiculo subidas y URLs guardadas exitosamente!' });
    } catch (error) {
      console.error('Error en uploadAndStoreImage: ', error);
      res.status(500).send(error.message);
    }
  }
};
export { UsuarioController };
