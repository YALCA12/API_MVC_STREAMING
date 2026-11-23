
const { sql } = require('../config/database');

// Mostrar todas las reproducciones
const obtenerReproducciones = async () => {
    const resultado = await sql.query(
        'SELECT * FROM Reproducciones'
    );

    return resultado.recordset;
};

// Buscar reproduccion por ID
const obtenerReproduccionPorId = async (id) => {
    const resultado = await sql.query`
        SELECT * FROM Reproducciones
        WHERE ReproduccionID = ${id}
    `;

    return resultado.recordset[0];
};

// Registrar reproduccion
const crearReproduccion = async (reproduccion) => {
    const resultado = await sql.query`
        INSERT INTO Reproducciones
        (UsuarioID, ContenidoID, FechaReproduccion, MinutosVistos)
        OUTPUT INSERTED.*
        VALUES (
            ${reproduccion.UsuarioID},
            ${reproduccion.ContenidoID},
            ${reproduccion.FechaReproduccion},
            ${reproduccion.MinutosVistos}
        )
    `;

    return resultado.recordset[0];
};

// Actualizar reproduccion
const actualizarReproduccion = async (id, reproduccion) => {
    const resultado = await sql.query`
        UPDATE Reproducciones
        SET UsuarioID = ${reproduccion.UsuarioID},
            ContenidoID = ${reproduccion.ContenidoID},
            FechaReproduccion = ${reproduccion.FechaReproduccion},
            MinutosVistos = ${reproduccion.MinutosVistos}
        OUTPUT INSERTED.*
        WHERE ReproduccionID = ${id}
    `;

    return resultado.recordset[0];
};

// Eliminar reproduccion
const eliminarReproduccion = async (id) => {
    const resultado = await sql.query`
        DELETE FROM Reproducciones
        WHERE ReproduccionID = ${id}
    `;

    return resultado.rowsAffected[0];
};

module.exports = {
    obtenerReproducciones,
    obtenerReproduccionPorId,
    crearReproduccion,
    actualizarReproduccion,
    eliminarReproduccion
};
