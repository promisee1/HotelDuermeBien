import Usuario from '../models/usuarios.js';
import Habitacion from '../models/habitaciones.js';
import Huespedes from '../models/huespedes.js';




//Consulta Login
export const login = async (req, res) => {

  // Variables requeridas desde el frontend para validación del login
  const { email, contrasena } = req.body;

  // Verificar que todos los valores estén definidos
  if (!email || !contrasena) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
  }

  //Quita todos los espacios para evitar errores de escritura
  const emailNormalizado = email.trim().toLowerCase();


  try {
    // Buscar el usuario en la base de datos usando findOne cuando el email coincida
    const user = await Usuario.findOne({ where: { email: emailNormalizado} });

    // Si no se encuentra el usuario o no corresponde a este
    if (!user) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    if (contrasena === user.contrasena) {  // Si no estás usando bcrypt

      return res.status(200).json({
        success: true,
        user: {
          id_usuario: user.id_usuario,
          nombre_usuario: user.nombre_usuario,
          email: user.email,
          rol: user.rol
        }
      });
    } else {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};


//Consulta Insertar Usuario (registrar)
export const register = async (req, res) => {
  //Variables desde el frontend para añadir un usuario
  const { nombre_usuario, email, contrasena, rol } = req.body;
  console.log({ nombre_usuario, email, contrasena, rol });

  // Verificar que todos los valores están definidos
  if (!nombre_usuario || !email || !contrasena || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Crear un nuevo usuario usando create
    const newUser = await Usuario.create({
      nombre_usuario,
      email,
      contrasena,  // Aquí puedes aplicar bcrypt si es necesario
      rol,
    });

    res.status(201).json({ message: "Registro exitoso", userId: newUser.id });
  } catch (err) {
    console.error("Error al registrar el usuario:", err);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};


//Consulta Select * usuarios
export const getAllUsuarios = async (req, res) => {
  try {
    // Consulta a la base de datos para obtener todos los usuarios
    const usuarios = await Usuario.findAll();

    // Devolver los usuarios en la respuesta
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};


// Obtener el ID del usuario logueado a través del token de autenticación
// Controlador para eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  // Variable requerida para comparar
  const { id } = req.params;
  
  try {
     // El ID del usuario que se intenta eliminar

    // Procede con la eliminación del usuario
    const resultado = await Usuario.destroy({ where: { id_usuario: id } });

    if (resultado === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};


//Controlador de actualizar usuario
export const updateUsuario = async (req, res) => {
  // Variable requerida para comparar
  const { id } = req.params;
  // Variables desde el frontend para actualizar el usuario
  const { nombre_usuario, email, rol } = req.body; // No incluimos la contraseña aquí

  try {
    //Consulta findByPk en este caso la primary key es la ID del usuario
    const usuario = await Usuario.findByPk(id); // Busca al usuario por ID
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Si encuentra al usuario actualiza los datos del usuario, excepto la contraseña
    await usuario.update({
      nombre_usuario: nombre_usuario || usuario.nombre_usuario,
      email: email || usuario.email,
      rol: rol || usuario.rol,
    });

    return res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador de obtener todas las habitaciones

export const obtenerHabitaciones = async (req, res) => {
  try {
    console.log("Iniciando consulta de habitaciones...");
    const habitaciones = await Habitacion.findAll();
    res.status(200).json(habitaciones);
  } catch (error) {
    console.error('Error al obtener las habitaciones:', error);
    res.status(500).json({ message: 'Error al obtener las habitaciones', error: error.message });
  }
};


// Controlador para registrar una habitación
export const crearHabitacion = async (req, res) => {
  const {numero_habitacion , capacidad, orientacion, estado_id} = req.body;
  try {
    const habitacion = await Habitacion.create({numero_habitacion, capacidad, orientacion, estado_id});
    res.status(201).json(habitacion);
  } catch (error) {
    console.error('Error al registrar la habitacion:', error);
    res.status(500).json({ message: 'Error al registrar la habitacion' });
  }
}

export const eliminarHabitacion  = async (req, res) => {
  const { id } = req.params;
  try {
    const habitacion = await Habitacion.findByPk(id);
    if (!habitacion) {
      return res.status(404).json({ message: 'Habitacion no encontrada' });
    }
    await habitacion.destroy();
    res.status(200).json({ message: 'Habitacion eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la habitacion:', error); 
    res.status(500).json({ message: 'Error al eliminar la habitacion' });
    }
}

export const actualizarHabitacion = async (req, res) => {
  const { id } = req.params;
  const { numero_habitacion, capacidad, orientacion, estado_id } = req.body;
  try {
    const habitacion = await Habitacion.findByPk(id);
    if (!habitacion) {
      return res.status(404).json({ message: 'Habitacion no encontrada' });
    }
    await habitacion.update({ numero_habitacion, capacidad, orientacion, estado_id });
    res.status(200).json({ message: 'Habitacion actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la habitacion:', error);
    res.status(500).json({ message: 'Error al actualizar la habitacion' });
  }
}

// Obtener todos los huéspedes
export const obtenerHuespedes = async (req, res) => {
  try {
      const huespedes = await Huespedes.findAll();
      res.status(200).json(huespedes);
  } catch (error) {
      console.error("Error al obtener los huéspedes:", error);
      res.status(500).json({ error: "Error al obtener los huéspedes" });
  }
};

// Obtener un huésped por ID
export const getHuespedById = async (req, res) => {
  try {
      const { id } = req.params;
      const huesped = await Huespedes.findByPk(id);

      if (huesped) {
          res.status(200).json(huesped);
      } else {
          res.status(404).json({ error: "Huésped no encontrado" });
      }
  } catch (error) {
      console.error("Error al obtener el huésped:", error);
      res.status(500).json({ error: "Error al obtener el huésped" });
  }
};

// Crear un nuevo huésped
export const crearHuesped = async (req, res) => {
  try {
      const { nombre, RUT, numero_contacto, correo_electronico, es_responsable } = req.body;
      const nuevoHuesped = await Huespedes.create({ nombre, RUT, numero_contacto, correo_electronico, es_responsable });
      res.status(201).json(nuevoHuesped);
  } catch (error) {
      console.error("Error al crear el huésped:", error);
      res.status(500).json({ error: "Error al crear el huésped" });
  }
};

// Actualizar un huésped por ID
export const actualizarHuesped = async (req, res) => {
  try {
      const { id } = req.params;
      const { nombre, RUT, numero_contacto, correo_electronico, es_responsable } = req.body;

      const huesped = await Huespedes.findByPk(id);
      if (huesped) {
          huesped.nombre = nombre;
          huesped.RUT = RUT;
          huesped.numero_contacto = numero_contacto;
          huesped.correo_electronico = correo_electronico;
          huesped.es_responsable = es_responsable;
          await huesped.save();
          res.status(200).json(huesped);
      } else {
          res.status(404).json({ error: "Huésped no encontrado" });
      }
  } catch (error) {
      console.error("Error al actualizar el huésped:", error);
      res.status(500).json({ error: "Error al actualizar el huésped" });
  }
};

// Eliminar un huésped por ID
export const eliminarHuesped = async (req, res) => {
  try {
      const { id } = req.params;
      const huesped = await Huespedes.findByPk(id);

      if (huesped) {
          await huesped.destroy();
          res.status(200).json({ message: "Huésped eliminado con éxito" });
      } else {
          res.status(404).json({ error: "Huésped no encontrado" });
      }
  } catch (error) {
      console.error("Error al eliminar el huésped:", error);
      res.status(500).json({ error: "Error al eliminar el huésped" });
  }
};