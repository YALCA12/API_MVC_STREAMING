
const Reproduccion = require('../models/Reproduccion');

// Obtener todas las reproducciones
const listarReproducciones = async (req, res) => {
    try {
        const reproducciones = await Reproduccion.obtenerReproducciones();

        res.status(200).json({
            mensaje: 'Lista de reproducciones',
            datos: reproducciones
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener reproducciones',
            error: error.message
        });
    }
};

// Buscar reproduccion por ID
const buscarReproduccion = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de reproduccion no valido'
            });
        }

        const reproduccion = await Reproduccion.obtenerReproduccionPorId(id);

        if (!reproduccion) {
            return res.status(404).json({
                mensaje: 'Reproduccion no encontrada'
            });
        }

        res.status(200).json(reproduccion);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar reproduccion',
            error: error.message
        });
    }
};

// Registrar reproduccion
const registrarReproduccion = async (req, res) => {
    try {
        const {
            UsuarioID, ContenidoID, FechaReproduccion, MinutosVistos
        } = req.body;

        if (!UsuarioID || !ContenidoID || !FechaReproduccion ||
            MinutosVistos === undefined) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios'
            });
        }

        if (!Number.isInteger(Number(UsuarioID)) || Number(UsuarioID) <= 0 ||
            !Number.isInteger(Number(ContenidoID)) || Number(ContenidoID) <= 0 ||
            !Number.isInteger(Number(MinutosVistos)) || Number(MinutosVistos) < 0) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son validos'
            });
        }

        const reproduccion = await Reproduccion.crearReproduccion({
            UsuarioID,
            ContenidoID,
            FechaReproduccion,
            MinutosVistos
        });

        res.status(201).json({
            mensaje: 'Reproduccion registrada correctamente',
            datos: reproduccion
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar reproduccion',
            error: error.message
        });
    }
};

// Actualizar reproduccion
const modificarReproduccion = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de reproduccion no valido'
            });
        }

        const {
            UsuarioID, ContenidoID, FechaReproduccion, MinutosVistos
        } = req.body;

        if (!UsuarioID || !ContenidoID || !FechaReproduccion ||
            MinutosVistos === undefined) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios'
            });
        }

        if (!Number.isInteger(Number(UsuarioID)) || Number(UsuarioID) <= 0 ||
            !Number.isInteger(Number(ContenidoID)) || Number(ContenidoID) <= 0 ||
            !Number.isInteger(Number(MinutosVistos)) || Number(MinutosVistos) < 0) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son validos'
            });
        }

        const reproduccion = await Reproduccion.actualizarReproduccion(id, {
            UsuarioID,
            ContenidoID,
            FechaReproduccion,
            MinutosVistos
        });

        if (!reproduccion) {
            return res.status(404).json({
                mensaje: 'Reproduccion no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Reproduccion actualizada correctamente',
            datos: reproduccion
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar reproduccion',
            error: error.message
        });
    }
};

// Eliminar reproduccion
const borrarReproduccion = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de reproduccion no valido'
            });
        }

        const resultado = await Reproduccion.eliminarReproduccion(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'Reproduccion no encontrada'
            });
        }

        res.status(200).json({
            mensaje: 'Reproduccion eliminada correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar reproduccion',
            error: error.message
        });
    }
};

module.exports = {
    listarReproducciones,
    buscarReproduccion,
    registrarReproduccion,
    modificarReproduccion,
    borrarReproduccion
};
