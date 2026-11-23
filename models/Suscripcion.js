
const { sql } = require('../config/database');

// Mostrar todas las suscripciones
const obtenerSuscripciones = async () => {
    const resultado = await sql.query(
        'SELECT * FROM Suscripciones'
    );

    return resultado.recordset;
};

// Buscar una suscripcion por su ID
const obtenerSuscripcionPorId = async (id) => {
    const resultado = await sql.query`
        SELECT * FROM Suscripciones
        WHERE SuscripcionID = ${id}
    `;

    return resultado.recordset[0];
};

// Registrar una suscripcion
const crearSuscripcion = async (suscripcion) => {
    const resultado = await sql.query`
        INSERT INTO Suscripciones
        (UsuarioID, PlanID, FechaInicio, FechaFin, Activo)
        OUTPUT INSERTED.*
        VALUES (
            ${suscripcion.UsuarioID},
            ${suscripcion.PlanID},
            ${suscripcion.FechaInicio},
            ${suscripcion.FechaFin},
            ${suscripcion.Activo}
        )
    `;

    return resultado.recordset[0];
};

// Actualizar una suscripcion
const actualizarSuscripcion = async (id, suscripcion) => {
    const resultado = await sql.query`
        UPDATE Suscripciones
        SET UsuarioID = ${suscripcion.UsuarioID},
            PlanID = ${suscripcion.PlanID},
            FechaInicio = ${suscripcion.FechaInicio},
            FechaFin = ${suscripcion.FechaFin},
            Activo = ${suscripcion.Activo}
        OUTPUT INSERTED.*
        WHERE SuscripcionID = ${id}
    `;

    return resultado.recordset[0];
};

// Eliminar una suscripcion
const eliminarSuscripcion = async (id) => {
    const resultado = await sql.query`
        DELETE FROM Suscripciones
        WHERE SuscripcionID = ${id}
    `;

    return resultado.rowsAffected[0];
};

module.exports = {
    obtenerSuscripciones,
    obtenerSuscripcionPorId,
    crearSuscripcion,
    actualizarSuscripcion,
    eliminarSuscripcion
};
