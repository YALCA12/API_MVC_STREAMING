
const express = require('express');
const router = express.Router();

const PlanController = require('../controllers/PlanController');

router.get('/', PlanController.listarPlanes);
router.get('/:id', PlanController.buscarPlan);
router.post('/', PlanController.registrarPlan);
router.put('/:id', PlanController.modificarPlan);
router.delete('/:id', PlanController.borrarPlan);

module.exports = router;
