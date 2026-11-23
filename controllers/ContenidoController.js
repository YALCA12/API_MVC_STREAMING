
const Contenido = require('../models/Contenido');

// Obtener todos los contenidos
const listarContenidos = async (req, res) => {
    try {
        const contenidos = await Contenido.obtenerContenidos();

        res.status(200).json({
            mensaje: 'Lista de contenidos',
            datos: contenidos
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener contenidos',
            error: error.message
        });
    }
};

// Buscar contenido por ID
const buscarContenido = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de contenido no valido'
            });
        }

        const contenido = await Contenido.obtenerContenidoPorId(id);

        if (!contenido) {
            return res.status(404).json({
                mensaje: 'Contenido no encontrado'
            });
        }

        res.status(200).json(contenido);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar contenido',
            error: error.message
        });
    }
};

// Registrar contenido
const registrarContenido = async (req, res) => {
    try {
        const {
            Titulo, Tipo, Categoria, Anio, DuracionMin, Disponible
        } = req.body;

        if (!Titulo || !Tipo || !Categoria || Anio === undefined ||
            DuracionMin === undefined || Disponible === undefined) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios'
            });
        }

        if (!Number.isInteger(Number(Anio)) || Number(Anio) <= 0 ||
            !Number.isInteger(Number(DuracionMin)) || Number(DuracionMin) <= 0 ||
            ![0, 1, true, false].includes(Disponible)) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son validos'
            });
        }

        const contenido = await Contenido.crearContenido({
            Titulo,
            Tipo,
            Categoria,
            Anio,
            DuracionMin,
            Disponible
        });

        res.status(201).json({
            mensaje: 'Contenido registrado correctamente',
            datos: contenido
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar contenido',
            error: error.message
        });
    }
};

// Actualizar contenido
const modificarContenido = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de contenido no valido'
            });
        }

        const {
            Titulo, Tipo, Categoria, Anio, DuracionMin, Disponible
        } = req.body;

        if (!Titulo || !Tipo || !Categoria || Anio === undefined ||
            DuracionMin === undefined || Disponible === undefined) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios'
            });
        }

        if (!Number.isInteger(Number(Anio)) || Number(Anio) <= 0 ||
            !Number.isInteger(Number(DuracionMin)) || Number(DuracionMin) <= 0 ||
            ![0, 1, true, false].includes(Disponible)) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son validos'
            });
        }

        const contenido = await Contenido.actualizarContenido(id, {
            Titulo,
            Tipo,
            Categoria,
            Anio,
            DuracionMin,
            Disponible
        });

        if (!contenido) {
            return res.status(404).json({
                mensaje: 'Contenido no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Contenido actualizado correctamente',
            datos: contenido
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar contenido',
            error: error.message
        });
    }
};

// Eliminar contenido
const borrarContenido = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de contenido no valido'
            });
        }

        const resultado = await Contenido.eliminarContenido(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'Contenido no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Contenido eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar contenido',
            error: error.message
        });
    }
};

module.exports = {
    listarContenidos,
    buscarContenido,
    registrarContenido,
    modificarContenido,
    borrarContenido
};
