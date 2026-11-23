
const Pago = require('../models/Pago');

// Obtener todos los pagos
const listarPagos = async (req, res) => {
    try {
        const pagos = await Pago.obtenerPagos();

        res.status(200).json({
            mensaje: 'Lista de pagos',
            datos: pagos
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener pagos',
            error: error.message
        });
    }
};

// Buscar pago por ID
const buscarPago = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de pago no valido'
            });
        }

        const pago = await Pago.obtenerPagoPorId(id);

        if (!pago) {
            return res.status(404).json({
                mensaje: 'Pago no encontrado'
            });
        }

        res.status(200).json(pago);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar pago',
            error: error.message
        });
    }
};

// Registrar pago
const registrarPago = async (req, res) => {
    try {
        const {
            SuscripcionID, FechaPago, Monto, MetodoPago, EstadoPago
        } = req.body;

        if (!SuscripcionID || !FechaPago || Monto === undefined ||
            !MetodoPago || !EstadoPago) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios'
            });
        }

        if (!Number.isInteger(Number(SuscripcionID)) || Number(SuscripcionID) <= 0 ||
            !Number.isFinite(Number(Monto)) || Number(Monto) < 0) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son validos'
            });
        }

        const pago = await Pago.crearPago({
            SuscripcionID,
            FechaPago,
            Monto,
            MetodoPago,
            EstadoPago
        });

        res.status(201).json({
            mensaje: 'Pago registrado correctamente',
            datos: pago
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar pago',
            error: error.message
        });
    }
};

// Actualizar pago
const modificarPago = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de pago no valido'
            });
        }

        const {
            SuscripcionID, FechaPago, Monto, MetodoPago, EstadoPago
        } = req.body;

        if (!SuscripcionID || !FechaPago || Monto === undefined ||
            !MetodoPago || !EstadoPago) {
            return res.status(400).json({
                mensaje: 'Faltan campos obligatorios'
            });
        }

        if (!Number.isInteger(Number(SuscripcionID)) || Number(SuscripcionID) <= 0 ||
            !Number.isFinite(Number(Monto)) || Number(Monto) < 0) {
            return res.status(400).json({
                mensaje: 'Los datos enviados no son validos'
            });
        }

        const pago = await Pago.actualizarPago(id, {
            SuscripcionID,
            FechaPago,
            Monto,
            MetodoPago,
            EstadoPago
        });

        if (!pago) {
            return res.status(404).json({
                mensaje: 'Pago no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Pago actualizado correctamente',
            datos: pago
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar pago',
            error: error.message
        });
    }
};

// Eliminar pago
const borrarPago = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de pago no valido'
            });
        }

        const resultado = await Pago.eliminarPago(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'Pago no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Pago eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar pago',
            error: error.message
        });
    }
};

module.exports = {
    listarPagos,
    buscarPago,
    registrarPago,
    modificarPago,
    borrarPago
};
