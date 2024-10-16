import jwt from 'jsonwebtoken'; 
import Usuario from '../models/usuarios.js';


//Consulta Login
export const login = async (req, res) => {

  const { email, contrasena } = req.body;
  // Verificar que todos los valores este definido
  if (!email || !contrasena) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
  }

  //Quita todos los espacios 
  const emailNormalizado = email.trim().toLowerCase();


  try {
    // Buscar el usuario en la base de datos usando Sequelize
    const user = await Usuario.findOne({ where: { email: emailNormalizado } });

    // Si no se encuentra el usuario o no corresponde a este
    if (!user) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    if (contrasena === user.contrasena) {  // Si no estás usando bcrypt

      // Generar el token JWT
      const token = jwt.sign({ id: user.id_usuario, rol: user.rol }, 'clave_secreta', { expiresIn: '1h' });  // Cambia 'clave_secreta' por una clave segura

      return res.status(200).json({
        success: true,
        token,  // Devuelve el token al cliente
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
  const { nombre_usuario, email, contrasena, rol } = req.body;
  console.log({ nombre_usuario, email, contrasena, rol });

  // Verificar que todos los valores están definidos
  if (!nombre_usuario || !email || !contrasena || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Crear un nuevo usuario usando Sequelize
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


export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;  // Obtener el id desde la URL
  try {
    // Lógica para eliminar usuario
    const result = await Usuario.destroy({ where: { id_usuario: id } });  // Verifica que 'id_usuario' sea la columna correcta

    if (result === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};
export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre_usuario, email, rol } = req.body; // No incluimos la contraseña aquí

  try {
    const usuario = await Usuario.findByPk(id); // Busca al usuario por ID
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualiza los datos del usuario, excepto la contraseña
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
