
const { sql } = require('../config/database');

// Mostrar todos los pagos
const obtenerPagos = async () => {
    const resultado = await sql.query(
        'SELECT * FROM Pagos'
    );

    return resultado.recordset;
};

// Buscar pago por ID
const obtenerPagoPorId = async (id) => {
    const resultado = await sql.query`
        SELECT * FROM Pagos
        WHERE PagoID = ${id}
    `;

    return resultado.recordset[0];
};

// Registrar pago
const crearPago = async (pago) => {
    const resultado = await sql.query`
        INSERT INTO Pagos
        (SuscripcionID, FechaPago, Monto, MetodoPago, EstadoPago)
        OUTPUT INSERTED.*
        VALUES (
            ${pago.SuscripcionID},
            ${pago.FechaPago},
            ${pago.Monto},
            ${pago.MetodoPago},
            ${pago.EstadoPago}
        )
    `;

    return resultado.recordset[0];
};

// Actualizar pago
const actualizarPago = async (id, pago) => {
    const resultado = await sql.query`
        UPDATE Pagos
        SET SuscripcionID = ${pago.SuscripcionID},
            FechaPago = ${pago.FechaPago},
            Monto = ${pago.Monto},
            MetodoPago = ${pago.MetodoPago},
            EstadoPago = ${pago.EstadoPago}
        OUTPUT INSERTED.*
        WHERE PagoID = ${id}
    `;

    return resultado.recordset[0];
};

// Eliminar pago
const eliminarPago = async (id) => {
    const resultado = await sql.query`
        DELETE FROM Pagos
        WHERE PagoID = ${id}
    `;

    return resultado.rowsAffected[0];
};

module.exports = {
    obtenerPagos,
    obtenerPagoPorId,
    crearPago,
    actualizarPago,
    eliminarPago
};
