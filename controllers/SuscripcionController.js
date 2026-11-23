
const Suscripcion = require('../models/Suscripcion');

// Obtener todas las suscripciones
const listarSuscripciones = async (req, res) => {
    try {
        const suscripciones = await Suscripcion.obtenerSuscripciones();

        res.status(200).json({
            mensaje: 'Lista de suscripciones',
            datos: suscripciones
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener suscripciones',
            error: error.message
        });
    }
};

// Obtener suscripcion por ID
const buscarSuscripcion = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de suscripcion no valido'
            });
        }

        const suscripcion = await Suscripcion.obtenerSuscripcionPorId(id);

        if (!suscripcion) {
            return res.status(404).json({
                mensaje: 'Suscripcion no encontrada'
            });
        }

        res.status(200).json(suscripcion);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar suscripcion',
            error: error.message
        });
    }
};

// Registrar suscripcion
const registrarSuscripcion = async (req, res) => {
    try {
        const { UsuarioID, PlanID, FechaInicio, FechaFin, Activo } = req.body;

        if (!UsuarioID || !PlanID || !FechaInicio || Activo === undefined) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios'
            });
        }

        if (!Number.isInteger(Number(UsuarioID)) || Number(UsuarioID) <= 0 ||
            !Number.isInteger(Number(PlanID)) || Number(PlanID) <= 0 ||
            ![0, 1, true, false].includes(Activo)) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son validos'
            });
        }

        const suscripcion = await Suscripcion.crearSuscripcion({
            UsuarioID,
            PlanID,
            FechaInicio,
            FechaFin: FechaFin || null,
            Activo
        });

        res.status(201).json({
            mensaje: 'Suscripcion registrada correctamente',
            datos: suscripcion
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar suscripcion',
            error: error.message
        });
    }
};

// Actualizar suscripcion
const modificarSuscripcion = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de suscripcion no valido'
            });
        }

        const { UsuarioID, PlanID, FechaInicio, FechaFin, Activo } = req.body;

        if (!UsuarioID || !PlanID || !FechaInicio || Activo === undefined) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios'
            });
        }

        if (!Number.isInteger(Number(UsuarioID)) || Number(UsuarioID) <= 0 ||
            !Number.isInteger(Number(PlanID)) || Number(PlanID) <= 0 ||
            ![0, 1, true, false].includes(Activo)) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son validos'
            });
        }

        const suscripcion = await Suscripcion.actualizarSuscripcion(id, {
            UsuarioID,
            PlanID,
            FechaInicio,
            FechaFin: FechaFin || null,
            Activo
        });

        if (!suscripcion) {
            return res.status(404).json({
                mensaje: 'Suscripcion no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Suscripcion actualizada correctamente',
            datos: suscripcion
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar suscripcion',
            error: error.message
        });
    }
};

// Eliminar suscripcion
const borrarSuscripcion = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de suscripcion no valido'
            });
        }

        const resultado = await Suscripcion.eliminarSuscripcion(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'Suscripcion no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Suscripcion eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar suscripcion',
            error: error.message
        });
    }
};

module.exports = {
    listarSuscripciones,
    buscarSuscripcion,
    registrarSuscripcion,
    modificarSuscripcion,
    borrarSuscripcion
};
