
const Plan = require('../models/Plan');

// Obtener todos los planes
const listarPlanes = async (req, res) => {
    try {
        const planes = await Plan.obtenerPlanes();

        res.status(200).json({
            mensaje: 'Lista de planes',
            datos: planes
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener planes',
            error: error.message
        });
    }
};

// Obtener plan por ID
const buscarPlan = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de plan no valido'
            });
        }

        const plan = await Plan.obtenerPlanPorId(id);

        if (!plan) {
            return res.status(404).json({
                mensaje: 'Plan no encontrado'
            });
        }

        res.status(200).json(plan);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al buscar plan',
            error: error.message
        });
    }
};

// Registrar plan
const registrarPlan = async (req, res) => {
    try {
        const { NombrePlan, Precio, CantidadPantallas } = req.body;

        if (!NombrePlan || Precio === undefined || CantidadPantallas === undefined) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        if (Number(Precio) < 0 || !Number.isFinite(Number(Precio)) ||
            !Number.isInteger(Number(CantidadPantallas)) || Number(CantidadPantallas) <= 0) {
            return res.status(400).json({
                mensaje: 'Precio o cantidad de pantallas no validos'
            });
        }

        const plan = await Plan.crearPlan({
            NombrePlan,
            Precio,
            CantidadPantallas
        });

        res.status(201).json({
            mensaje: 'Plan registrado correctamente',
            datos: plan
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar plan',
            error: error.message
        });
    }
};

// Actualizar plan
const modificarPlan = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de plan no valido'
            });
        }

        const { NombrePlan, Precio, CantidadPantallas } = req.body;

        if (!NombrePlan || Precio === undefined || CantidadPantallas === undefined) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        if (Number(Precio) < 0 || !Number.isFinite(Number(Precio)) ||
            !Number.isInteger(Number(CantidadPantallas)) || Number(CantidadPantallas) <= 0) {
            return res.status(400).json({
                mensaje: 'Precio o cantidad de pantallas no validos'
            });
        }

        const plan = await Plan.actualizarPlan(id, {
            NombrePlan,
            Precio,
            CantidadPantallas
        });

        if (!plan) {
            return res.status(404).json({
                mensaje: 'Plan no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Plan actualizado correctamente',
            datos: plan
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar plan',
            error: error.message
        });
    }
};

// Eliminar plan
const borrarPlan = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({
                mensaje: 'ID de plan no valido'
            });
        }

        const resultado = await Plan.eliminarPlan(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensaje: 'Plan no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Plan eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar plan',
            error: error.message
        });
    }
};

module.exports = {
    listarPlanes,
    buscarPlan,
    registrarPlan,
    modificarPlan,
    borrarPlan
};
