import bcrypt from 'bcrypt';
import { query } from '../config/db.js';


export const login = async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
  }

  const emailNormalizado = email.trim().toLowerCase();

  try {
    // Realiza la consulta a la base de datos
    const rows = await query("SELECT id_usuario, nombre_usuario, email, contrasena, rol FROM usuarios WHERE email = ?", [emailNormalizado]);

    if (!rows || rows.length === 0) {
      console.log("No se encontró ningún usuario con ese email");
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    const user = rows[0];

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    if (contrasena === user.contrasena) {
      console.log("Usuario encontrado:", user);
      return res.status(200).json({ success: true, user });
    } else {
      console.log("Contraseña incorrecta");
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al ejecutar la consulta:", error);
    return res.status(500).json({ success: false, message: "Error en el servidor" });
  }
};



export const register = async (req, res) => {
  const { nombre_usuario, email, contrasena, rol } = req.body;

  // Verificar que todos los valores están definidos
  if (!nombre_usuario || !email || !contrasena || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Insertar los datos en la tabla de usuarios
    const result = await query(
      "INSERT INTO usuarios (nombre_usuario, email, contrasena, rol) VALUES (?, ?, ?, ?)",
      [nombre_usuario, email, contrasena, rol]
    );

    res
      .status(201)
      .json({ message: "Registro exitoso", userId: result.insertId });
  } catch (err) {
    console.error("Error al registrar el usuario:", err);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};
