import Habitacion from './habitacion.js';
import DetalleReserva from './detallereserva.js';
import Huesped from './huesped.js';
import Pago from './pago.js';
import Reserva from './reserva.js';

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

// Exportar todos los modelos
export {
  Habitacion,
  DetalleReserva,
  Huesped,
  Pago,
  Reserva
};
