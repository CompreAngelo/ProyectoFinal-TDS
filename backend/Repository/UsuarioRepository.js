
import { SupabaseClientSingleton } from '../data/dbContection.js';
import { Usuario } from '../Models/Usuario.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import { decode } from "base64-arraybuffer";

class UsuarioRepository {
  constructor() {
    this.supabase = SupabaseClientSingleton.getInstance();
    this.usuario = "usuario";
    this.tableName = "usuario";
  }

  mapToUserInstance(
    id,
    correo,
    nombre,
    apellido,
    cedula,
    role,
    estado,
    horario_entrada,
    horario_salida,
    salario,
    contrasena
  ) {
    return new Usuario(
      id,
      correo,
      nombre,
      apellido,
      cedula,
      role,
      estado,
      horario_entrada,
      horario_salida,
      salario,
      contrasena // Aquí asigno la contraseña al campo correcto
    );
  }

  async getAllUsers() {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*");
      if (error) console.log(error.message);
      return data.map(this.mapToUserInstance);
    } catch (error) {
      console.log(error.message);
    }
  }
  async getUserById(userId) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("id", userId);
      if (error) throw error;
      return data.length > 0 ? this.mapToUserInstance(data[0]) : null;
    } catch (error) {
      throw error;
    }
  }
  async getUserByCedula(cedula) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("cedula", cedula);
      if (error) throw error;
      return data.length > 0 ? this.mapToUserInstance(data[0]) : null;
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail(email) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("correo", email);
      if (error) throw error;
      return data.length > 0 ? this.mapToUserInstance(data[0]) : null;
    } catch (error) {
      throw error;
    }
  }

  async createUser({
    nombre,
    apellido,
    cedula,
    correo,
    role,
    estado,
    horario_entrada,
    horario_salida,
    salario,
    contrasena,
    telefono,
  }) {
    try {
      const newUser = await this.supabase.from(this.tableName).upsert([
        {
          nombre,
          apellido,
          cedula,
          correo,
          telefono,
          estado,
          horario_entrada,
          horario_salida,
          salario,
          role: "USUARIO",
          contrasena,
        },
      ]);

      return this.mapToUserInstance(newUser[0]);
    } catch (error) {
      throw error;
    }
  }
  async createAgente({
    nombre,
    apellido,
    cedula,
    correo,
    role,
    estado,
    horario_entrada,
    horario_salida,
    salario,
    contrasena,
    telefono
  }) {
    try {
      const newAgente = await this.supabase.from(this.tableName).upsert([
        {
          nombre,
          apellido,
          cedula,
          correo,
          estado,
          horario_entrada,
          horario_salida,
          salario,
          role: "AGENTE",
          contrasena,
          telefono
        },
      ]);
      return this.mapToUserInstance(newAgente[0]);
    } catch (error) {
      throw error;
    }
  }

  async updateUser({ id, telefono, contrasena }) {
    try {
      // Verificar la existencia del usuario
      const existingUser = await this.getUserById(id);
      if (!existingUser) {
        throw new Error("Usuario no encontrado");
      }

      // Construir el objeto con los datos actualizados del usuario
      const updatedUserData = {};
      if (telefono) {
        updatedUserData.telefono = telefono;
      }
      
      if (contrasena) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contrasena, salt);
        updatedUserData.contrasena = hashedPassword;
      }

      // Realizar la actualización en la base de datos utilizando el ID del usuario
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updatedUserData)
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Devolver el usuario actualizado
      return this.mapToUserInstance(data);
    } catch (error) {
      throw error;
    }
  }


  async uploadImage(userId, foto) {
    try {

      const base64 = foto.split("base64,")[1];
      const fileType = foto.split(";")[0].split("/")[1];
      const fotoFileName = uuidv4() + "." + fileType;

      const folderName = `usuario_${userId}`;

      const { data: fotoData, error: fotoError } = await this.supabase.storage
        .from(`imagenesUsuarios/public/${folderName}`)
        .upload(fotoFileName, decode(base64), {
          contentType: "image/png",
        });

      if (fotoError) {
        console.error("Error cargando la imagen del usuario: ", fotoError);
        throw new Error("Error cargando la imagen del usuario");
      }

      const fotoUrl = `https://inmfmanpaarrwhoyyctn.supabase.co/storage/v1/object/public/imagenesUsuarios/public/${folderName}/${fotoFileName}`;

      return { fotoUrl };
    } catch (error) {
      console.error("Error en uploadImage: ", error);
      throw error;
    }
  }

  async storeImage(userId, fotoUrl) {
   
    try {

      const { data, error } = await this.supabase
        .from("usuario")
        .update({ foto: fotoUrl })
        .match({ id: userId });

      if (error) {
        console.error("Error al guardar la URL de la imagen: ", error);
        throw new Error("Error al guardar la URL de la imagen");
      }

      console.log("URLs de las imágenes guardadas con éxito!");
      return data;
    } catch (error) {
      console.error("Error en storeImage: ", error);
      throw error;
    }
  }

  async uploadImageVehicle(userId, foto_Vehiculo) {
    try {

      const base64_Vehiculo = foto_Vehiculo.split("base64,")[1];
      const fileType_Vehiculo = foto_Vehiculo.split(";")[0].split("/")[1];
      const foto_VehiculoFileName = uuidv4() + "." + fileType_Vehiculo;

      const folderName = `usuario_${userId}`;

      const { data: foto_VehiculoData, error: foto_VehiculoError } = await this.supabase.storage
      .from(`imagenesUsuarios/public/${folderName}`)
      .upload(foto_VehiculoFileName, decode(base64_Vehiculo), {
            contentType: "image/png",
          });

      if (foto_VehiculoError) {
        console.error(
          "Error cargando la imagen del vehiculo: ",
          foto_VehiculoError
        );
        throw new Error("Error cargando la imagen del vehiculo");
      }

      const foto_VehiculoUrl = `https://inmfmanpaarrwhoyyctn.supabase.co/storage/v1/object/public/imagenesUsuarios/public/${folderName}/${foto_VehiculoFileName}`;

      return { foto_VehiculoUrl};
    } catch (error) {
      console.error("Error en uploadImage: ", error);
      throw error;
    }
  }

  async storeImageVehicle(userId, foto_VehiculoUrl) {
   
    try {

      const { data, error } = await this.supabase
        .from("usuario")
        .update({ foto_Vehiculo: foto_VehiculoUrl })
        .match({ id: userId});

      if (error) {
        console.error("Error al guardar la URL de la imagen vehiculo: ", error);
        throw new Error("Error al guardar la URL de la imagen");
      }

      console.log("URLs de las imágenes guardadas con éxito!");
      return data;
    } catch (error) {
      console.error("Error en storeImage: ", error);
      throw error;
    }
  }


  async deleteUser(userId) {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .delete()
        .eq("id", userId);
      if (error) throw error;

      return this.mapToUserInstance(data[0]);
    } catch (error) {
      throw error;
    }
  }
  async updateUserPasswordByEmail(email, newPassword) {
    try {
      const usuarioActual = await this.getUserByEmail(email);

      if (!usuarioActual) {
        throw new Error("Usuario no encontrado");
      }

      // Actualizar la contraseña del usuario
      const { data, error } = await this.supabase
        .from(this.usuario)
        .update({ contrasena: newPassword })
        .eq("correo", email);

      if (error) {
        throw error;
      }

      return { mensaje: "Contraseña actualizada correctamente" };
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const { data, error } = await this.supabase
        .from(this.usuario)
        .select("*")
        .eq("correo", email);

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return null;
      }

      return this.mapToUserInstance(data[0]);
    } catch (error) {
      throw error;
    }
  }

  //funsion para interactuar con la db
  async loginUser(cedula, contrasena) {
    try {
      if (cedula.length !== 11) {
        throw new Error("La cédula debe tener al menos 11 dígitos");
      }
      if (typeof contrasena !== "string" || contrasena.trim().length === 0) {
        throw new Error("La contraseña no puede estar vacía");
      }

      console.log(
        "Consultando la base de datos para el usuario con cédula:",
        cedula
      );

      const { data, error } = await this.supabase
        .from(this.usuario)
        .select("*")
        .eq("cedula", cedula);

      if (error) throw error;
      if (data.length === 0) throw new Error("Usuario no encontrado");

      const userData = data[0];
      const user = new Usuario();
      user.id = userData.id;
      user.correo = userData.correo;
      user.nombre = userData.nombre;
      user.apellido = userData.apellido;
      user.cedula = userData.cedula;
      user.role = userData.role;
      user.estado = userData.estado;
      user.horario_entrada = userData.horario_entrada; // Aquí se almacena la contraseña
      user.horario_salida = userData.horario_salida;
      user.salario = userData.salario;
      user.telefono = userData.telefono;
      user.foto = userData.foto;
      user.foto_Vehiculo = userData.foto_Vehiculo;
      user.contrasena = userData.contrasena;

      console.log("Usuario encontrado en la base de datos:", user);

      // Verificar si la contraseña almacenada es una cadena
      if (typeof user.contrasena !== "string") {
        throw new Error("La contraseña almacenada no es una cadena");
      }

      const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);
      console.log(
        "¿La contraseña proporcionada coincide con la almacenada?",
        passwordMatch
      );

      if (!passwordMatch) {
        throw new Error("Contraseña incorrecta");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async getUserNameByCedula(cedula) {
    try {
      // Realizar la consulta a la base de datos para obtener el nombre del usuario
      const { data, error } = await this.supabase
        .from(this.usuario)
        .select("nombre")
        .eq("cedula", cedula);

      if (error) {
        throw error;
      }

      // Verificar si se encontraron datos
      if (!data || data.length === 0) {
        throw new Error("Usuario no encontrado");
      }

      // Extraer el nombre del usuario de los datos devueltos por la consulta
      const { nombre } = data[0];
      return nombre;
    } catch (error) {
      throw error;
    }
  }

  async updateUserByNewPassword(req, res) {
    const userId = req.params.id; // Obtener el ID del usuario de la solicitud
    const { newPassword } = req.body; // Obtener la nueva contraseña del cuerpo de la solicitud

    try {
      // Actualizar la contraseña del usuario con la nueva contraseña
      await this.usuarioRepository.updateUserPassword(userId, newPassword);

      // Enviar una respuesta de éxito al cliente
      res.json({ mensaje: "Contraseña actualizada exitosamente" });
    } catch (error) {
      // Manejar errores y enviar una respuesta de error al cliente
      console.error(error);
      res.status(500).send("Error actualizando contraseña del usuario");
    }
  }
/*----------------------------------------------Logica de administrador----------------------------------------------*/
async getAgents() {
  try {
    // Realizar la consulta a la base de datos para obtener los usuarios con el rol de AGENTE
    const { data, error } = await this.supabase
      .from(this.usuario)
      .select('*')
      .eq('role', 'AGENTE');

    if (error) {
      throw error;
    }

    // Mapear los datos de los usuarios a instancias de Usuario y devolverlos
    const agents = data.map(userData => {
      const user = new Usuario();
      user.id = userData.id;
      user.correo = userData.correo;
      user.nombre = userData.nombre;
      user.apellido = userData.apellido;
      user.cedula = userData.cedula;
      user.role = userData.role;
      user.estado = userData.estado;
      user.horario_entrada = userData.horario_entrada;
      user.horario_salida = userData.horario_salida;
      user.salario = userData.salario;
      user.telefono = userData.telefono;
      user.foto = userData.foto;
      user.foto_Vehiculo = userData.foto_Vehiculo;
      user.contrasena = userData.contrasena;
      return user;
    });

    return agents; // Devolver el array de agentes
 } catch (error) {
    throw error;
 }
}
async updateAgentDetails(userId, updatedDetails) {
  try {
     // Preparar el objeto de actualización, solo incluyendo los campos que se proporcionaron
     const updateObject = {};
     if (updatedDetails.horario_entrada !== undefined) {
       updateObject.horario_entrada = updatedDetails.horario_entrada;
     }
     if (updatedDetails.horario_salida !== undefined) {
       updateObject.horario_salida = updatedDetails.horario_salida;
     }
     if (updatedDetails.estado !== undefined) {
       updateObject.estado = updatedDetails.estado;
     }
     if (updatedDetails.telefono !== undefined) {
       updateObject.telefono = updatedDetails.telefono;
     }
 
     // Verificar si hay al menos un campo para actualizar
     if (Object.keys(updateObject).length === 0) {
       throw new Error('No se proporcionaron detalles para actualizar el agente');
     }
 
     // Actualizar los detalles del agente en la base de datos
     const { data, error } = await this.supabase
       .from(this.usuario)
       .update(updateObject)
       .eq('id', userId);
 
     if (error) {
       throw error;
     }
 
     // Mapear los datos actualizados a una instancia de Usuario y devolverlo
     if (data.length > 0) {
       return this.mapToUserInstance(data[0]);
     } else {
       throw new Error('No se pudo actualizar el agente');
     }
  } catch (error) {
     throw error;
  }
 }

 async createAgent({
  nombre,
  apellido,
  cedula,
  correo,
  role,
  estado,
  horario_entrada,
  horario_salida,
  salario,
  contrasena,
  telefono
}) {
  try {
    const newUser = await this.supabase.from(this.tableName).upsert([
      {
        nombre,
        apellido,
        cedula,
        correo,
        estado,
        horario_entrada,
        horario_salida,
        salario,
        telefono,
        role: "AGENTE",
        contrasena,
      },
    ]);

    return this.mapToUserInstance(newUser[0]);
  } catch (error) {
    throw error;
  }
}

//actualizar agente
// Repositorio UsuarioRepository
async updateAgent({ id, telefono, horarioEntrada, horarioSalida, estado, role }) {
  try {
    // Verificar la existencia del agente
    const existingAgent = await this.getUserById(id);
    if (!existingAgent) {
      throw new Error("Agente no encontrado");
    }

    // Construir el objeto con los datos actualizados del agente
    const updatedAgentData = {
      ...(telefono && { telefono }),
      ...(horarioEntrada && { horario_entrada: horarioEntrada }),  // Corrección aquí
      ...(horarioSalida && { horario_salida: horarioSalida }),    // Corrección aquí
      ...(estado && { estado }),
      ...(role && { role })
    };

    // Realizar la actualización en la base de datos utilizando el ID del agente
    const { data, error } = await this.supabase
      .from(this.tableName)
      .update(updatedAgentData)
      .eq("id", id);

    if (error) {
      console.log('Error actualizando el agente:', error.message);
      throw error;
    }
    return this.mapToUserInstance(data); // Asegúrate de que esta función está implementada correctamente
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}



 
}

export { UsuarioRepository };
