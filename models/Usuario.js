
const { sql } = require('../config/database');

// Mostrar todos los usuarios
const obtenerUsuarios = async () => {
    const resultado = await sql.query(
        'SELECT * FROM Usuarios'
    );

    return resultado.recordset;
};

// Buscar un usuario por su ID
const obtenerUsuarioPorId = async (id) => {
    const resultado = await sql.query`
        SELECT * FROM Usuarios
        WHERE UsuarioID = ${id}
    `;

    return resultado.recordset[0];
};

// Registrar un usuario
const crearUsuario = async (usuario) => {
    const resultado = await sql.query`
        INSERT INTO Usuarios
        (Nombre, Email, Pais, FechaRegistro, Estado)
        OUTPUT INSERTED.*
        VALUES (
            ${usuario.Nombre},
            ${usuario.Email},
            ${usuario.Pais},
            ${usuario.FechaRegistro},
            ${usuario.Estado}
        )
    `;

    return resultado.recordset[0];
};

// Actualizar un usuario
const actualizarUsuario = async (id, usuario) => {
    const resultado = await sql.query`
        UPDATE Usuarios
        SET Nombre = ${usuario.Nombre},
            Email = ${usuario.Email},
            Pais = ${usuario.Pais},
            FechaRegistro = ${usuario.FechaRegistro},
            Estado = ${usuario.Estado}
        OUTPUT INSERTED.*
        WHERE UsuarioID = ${id}
    `;

    return resultado.recordset[0];
};

// Eliminar un usuario
const eliminarUsuario = async (id) => {
    const resultado = await sql.query`
        DELETE FROM Usuarios
        WHERE UsuarioID = ${id}
    `;

    return resultado.rowsAffected[0];
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};
