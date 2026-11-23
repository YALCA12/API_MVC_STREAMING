
const { sql } = require('../config/database');

// Mostrar todos los planes
const obtenerPlanes = async () => {
    const resultado = await sql.query(
        'SELECT * FROM Planes'
    );

    return resultado.recordset;
};

// Buscar un plan por su ID
const obtenerPlanPorId = async (id) => {
    const resultado = await sql.query`
        SELECT * FROM Planes
        WHERE PlanID = ${id}
    `;

    return resultado.recordset[0];
};

// Registrar un plan
const crearPlan = async (plan) => {
    const resultado = await sql.query`
        INSERT INTO Planes
        (NombrePlan, Precio, CantidadPantallas)
        OUTPUT INSERTED.*
        VALUES (
            ${plan.NombrePlan},
            ${plan.Precio},
            ${plan.CantidadPantallas}
        )
    `;

    return resultado.recordset[0];
};

// Actualizar un plan
const actualizarPlan = async (id, plan) => {
    const resultado = await sql.query`
        UPDATE Planes
        SET NombrePlan = ${plan.NombrePlan},
            Precio = ${plan.Precio},
            CantidadPantallas = ${plan.CantidadPantallas}
        OUTPUT INSERTED.*
        WHERE PlanID = ${id}
    `;

    return resultado.recordset[0];
};

// Eliminar un plan
const eliminarPlan = async (id) => {
    const resultado = await sql.query`
        DELETE FROM Planes
        WHERE PlanID = ${id}
    `;

    return resultado.rowsAffected[0];
};

module.exports = {
    obtenerPlanes,
    obtenerPlanPorId,
    crearPlan,
    actualizarPlan,
    eliminarPlan
};
