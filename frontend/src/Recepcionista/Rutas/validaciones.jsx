const validateForm = (fields) => {
    const errors = {};
    const { nombre, RUT, numero_contacto, correo_electronico } = fields;

    if (!nombre.trim()) errors.nombre = "El nombre es obligatorio.";
    if (!RUT.trim() || !/^\d+-\d{1}$/g.test(RUT))
        errors.RUT = "Ingrese un RUT válido (ejemplo: 12345678-9).";
    if (!numero_contacto.trim() || !/^\d+$/.test(numero_contacto) || numero_contacto.length < 8)
        errors.numero_contacto = "Ingrese un número de contacto válido (mínimo 8 dígitos).";
    if (!correo_electronico.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo_electronico))
        errors.correo_electronico = "Ingrese un correo electrónico válido.";

    return errors;
};

export default validateForm;
