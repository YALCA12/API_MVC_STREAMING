
const Usuario = require('../models/Usuario');

// Obtener todos los usuarios
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.obtenerUsuarios();

        res.status(200).json({
            mensaje: 'Lista de usuarios',
            datos: usuarios
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener usuarios',
            error: error.message
        });
    }
};

// Obtener usuario por ID
const buscarUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de usuario no valido'
            });
        }

        const usuario = await Usuario.obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.status(200).json(usuario);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar usuario',
            error: error.message
        });
    }
};

// Registrar usuario
const registrarUsuario = async (req, res) => {
    try {
        const { Nombre, Email, Pais, FechaRegistro, Estado } = req.body;

        if (!Nombre || !Email || !Pais || !FechaRegistro || !Estado) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        const usuario = await Usuario.crearUsuario({
            Nombre,
            Email,
            Pais,
            FechaRegistro,
            Estado
        });

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente',
            datos: usuario
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// Actualizar usuario
const modificarUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de usuario no valido'
            });
        }

        const { Nombre, Email, Pais, FechaRegistro, Estado } = req.body;

        if (!Nombre || !Email || !Pais || !FechaRegistro || !Estado) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        const usuario = await Usuario.actualizarUsuario(id, {
            Nombre,
            Email,
            Pais,
            FechaRegistro,
            Estado
        });

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Usuario actualizado correctamente',
            datos: usuario
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar usuario',
            error: error.message
        });
    }
};

// Eliminar usuario
const borrarUsuario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de usuario no valido'
            });
        }

        const resultado = await Usuario.eliminarUsuario(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar usuario',
            error: error.message
        });
    }
};

module.exports = {
    listarUsuarios,
    buscarUsuario,
    registrarUsuario,
    modificarUsuario,
    borrarUsuario
};
