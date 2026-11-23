
const { sql } = require('../config/database');

// Mostrar todos los contenidos
const obtenerContenidos = async () => {
    const resultado = await sql.query(
        'SELECT * FROM Contenidos'
    );

    return resultado.recordset;
};

// Buscar contenido por ID
const obtenerContenidoPorId = async (id) => {
    const resultado = await sql.query`
        SELECT * FROM Contenidos
        WHERE ContenidoID = ${id}
    `;

    return resultado.recordset[0];
};

// Registrar contenido
const crearContenido = async (contenido) => {
    const resultado = await sql.query`
        INSERT INTO Contenidos
        (Titulo, Tipo, Categoria, Anio, DuracionMin, Disponible)
        OUTPUT INSERTED.*
        VALUES (
            ${contenido.Titulo},
            ${contenido.Tipo},
            ${contenido.Categoria},
            ${contenido.Anio},
            ${contenido.DuracionMin},
            ${contenido.Disponible}
        )
    `;

    return resultado.recordset[0];
};

// Actualizar contenido
const actualizarContenido = async (id, contenido) => {
    const resultado = await sql.query`
        UPDATE Contenidos
        SET Titulo = ${contenido.Titulo},
            Tipo = ${contenido.Tipo},
            Categoria = ${contenido.Categoria},
            Anio = ${contenido.Anio},
            DuracionMin = ${contenido.DuracionMin},
            Disponible = ${contenido.Disponible}
        OUTPUT INSERTED.*
        WHERE ContenidoID = ${id}
    `;

    return resultado.recordset[0];
};

// Eliminar contenido
const eliminarContenido = async (id) => {
    const resultado = await sql.query`
        DELETE FROM Contenidos
        WHERE ContenidoID = ${id}
    `;

    return resultado.rowsAffected[0];
};

module.exports = {
    obtenerContenidos,
    obtenerContenidoPorId,
    crearContenido,
    actualizarContenido,
    eliminarContenido
};
