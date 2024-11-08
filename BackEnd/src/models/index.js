import Habitacion from './habitacion.js';
import DetalleReserva from './detallereserva.js';
import Huesped from './huesped.js';
import Pago from './pago.js';
import Reserva from './reserva.js';
import EstadoHabitacion from './estadohabitacion.js';
import HistorialHabitaciones from './historialhabitaciones.js';
import Usuario from './usuarios.js'

// Definir relaciones

// Una reserva tiene muchos detalles de reserva
Reserva.hasMany(DetalleReserva, { foreignKey: 'id_reserva' });
DetalleReserva.belongsTo(Reserva, { foreignKey: 'id_reserva' });

// Un huésped puede tener muchas reservas
Huesped.hasMany(Reserva, { foreignKey: 'id_huesped_responsable' });
Reserva.belongsTo(Huesped, { foreignKey: 'id_huesped_responsable' });

// Una habitación puede estar en muchos detalles de reserva
Habitacion.hasMany(DetalleReserva, { foreignKey: 'id_habitacion' });
DetalleReserva.belongsTo(Habitacion, { foreignKey: 'id_habitacion' });

// Un estado puede tener muchas habitaciones
EstadoHabitacion.hasMany(Habitacion, { foreignKey: 'id_estado' });
Habitacion.belongsTo(EstadoHabitacion, { foreignKey: 'id_estado' });

// Una habitacion puede tener muchos registros
Habitacion.hasMany(HistorialHabitaciones, { foreignKey: 'id_habitacion' });
HistorialHabitaciones.belongsTo(Habitacion, { foreignKey: 'id_habitacion' });

// Un estado puede aparecer en muchos registros historicos como estado anterior o nuevo
EstadoHabitacion.hasMany(HistorialHabitaciones, { as: 'EstadoAnterior', foreignKey: 'id_estado_anterior' });
EstadoHabitacion.hasMany(HistorialHabitaciones, { as: 'EstadoNuevo', foreignKey: 'id_estado_nuevo' });
HistorialHabitaciones.belongsTo(EstadoHabitacion, { as: 'EstadoAnterior', foreignKey: 'id_estado_anterior' });
HistorialHabitaciones.belongsTo(EstadoHabitacion, { as: 'EstadoNuevo', foreignKey: 'id_estado_nuevo' });

// Un usuario puede realizar muchos cambios de estado
Usuario.hasMany(HistorialHabitaciones, { foreignKey: 'id_usuario' });
HistorialHabitaciones.belongsTo(Usuario, { foreignKey: 'id_usuario' });
// Exportar todos los modelos
export {
  Habitacion,
  DetalleReserva,
  Huesped,
  Pago,
  Reserva,
  EstadoHabitacion,
  HistorialHabitaciones,
  Usuario
};